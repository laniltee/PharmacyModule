/**
 * Created by thisura on 6/29/17.
 */
var app = angular.module("myApp",[]);

var nowDate = new Date();
var currentdate = nowDate.getFullYear()+'-'+(nowDate.getMonth()+1)+'-'+nowDate.getDate();

app.controller("myCtrl",function ($scope,$http){

    var stcuserID = "AP1";//The user ID should be taken from the current login session
    $scope.stocks = [];

    $http.get("http://localhost:8086/stocks/"+stcuserID).then(function (response) {
        $scope.stocks = response.data;
    });

    function refreshStocks() {
        $http.get("http://localhost:8086/stocks/"+stcuserID).then(function (response) {
            $scope.stocks = response.data;
        });
    }


    $scope.addRequest = function (quantity,stock) {

        var reqAmount = quantity;
        var newRequest = {

            userID:stcuserID,//The user ID should be taken from the current login session
            requestID: "REQ"+Date.now(),
            drug:stock.drug,
            date:currentdate,
            amount:reqAmount,
            department:stock.department,
            status:"pending"
        };

        //Regular Expression to validate numbers
        var exp = /^[0-9]+$/;

        if(reqAmount != null) {
            if (reqAmount.match(exp)) {
                $http.post("http://localhost:8086/requests", newRequest).then(function (response) {
                    alert("Request sent successfully!");
                    refreshStocks();
                }, function (response) {
                    alert("Requesting Failed!")
                });
            }else{
                alert("Please enter a valid numeric amount!");
                refreshStocks();
            }
        }else{
            alert("Please enter the request quantity!");
        }

        // if(reqAmount != null) {
        //     $http.post("http://localhost:8086/requests", newRequest).then(function (response) {
        //         alert("Request sent successfully!");
        //         refreshStocks();
        //     }, function (response) {
        //         alert("Requesting Failed!")
        //     });
        // }else{
        //     alert("Please enter the request quantity!");
        // }


    };
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //View and delete requests of a particular user(Assistant pharmacist)
    var userID = "AP1";//should get user ID from log in session
    $scope.requests = [];

    $http.get("http://localhost:8086/requests/user/"+userID).then(function (response) {
        $scope.requests = response.data;
    });

    function refreshRequests() {
        $http.get("http://localhost:8086/requests/user/"+userID).then(function (response) {
            $scope.requests = response.data;
        });
    }

    $scope.deleteRequest = function (requestID) {

        var delRequest = requestID;

            $http.delete("http://localhost:8086/requests/" + delRequest).then(function (response) {
                alert("Request Deleted Successfully!");
                refreshRequests();
            }, function (response) {
                alert("Request Deleting Failed !")
            });

    };

    //View and edit requests of a particular user(Assistant pharmacist)
    // $scope.editRequest = function (requestID) {
    //
    //     var editRequest = requestID;
    //     var newAmount =
    //
    //     $http.put("http://localhost:8086/requests/edit/" + editRequest).then(function (response) {
    //         alert("Request Deleted Successfully!");
    //         refreshRequests();
    //     }, function (response) {
    //         alert("Request Deleting Failed !")
    //     });
    // }

});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.controller("chiefCtrl",function ($scope,$http){
    $scope.requests = [];

    $http.get("http://localhost:8086/requests").then(function (response) {
        $scope.requests = response.data;
    });

    function refreshCPRequests() {
        $http.get("http://localhost:8086/requests").then(function (response) {
            $scope.requests = response.data;
        });
    }

    //Approve a request
    $scope.approveRequest = function (requestID) {
        $http.get("http://localhost:8086/requests").then(function (response) {
            $scope.requests = response.data;
        });
        var reqID = requestID;
        var newStatus = {
            status:"approved"

        };


            $http.put("http://localhost:8086/requests/" + reqID,newStatus).then(function (response) {

                alert("Request Approved!");
                refreshCPRequests();
            }, function (response) {
                alert("Request Approving Failed!")
            });

    };

    //Reject a request
    $scope.rejectRequest = function (requestID) {
        $http.get("http://localhost:8086/requests").then(function (response) {
            $scope.requests = response.data;
        });
        var reqID = requestID;
        var newStatus = {
            status:"rejected"

        };

            $http.put("http://localhost:8086/requests/" + reqID,newStatus).then(function (response) {

                alert("Request Rejected!");
                refreshCPRequests();
            }, function (response) {
                alert("Request Rejecting Failed !")
            });

    };
});