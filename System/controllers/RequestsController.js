/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
 app.controller("RequestsController", function($scope, $http){

    var stcuserID = sessionStorage.getItem("username");
    var nowDate = new Date();
    var currentdate = nowDate.getFullYear()+'-'+(nowDate.getMonth()+1)+'-'+nowDate.getDate();

    $scope.requests = [];
    $scope.allReqs = [];
    $scope.stocks = [];

    $http.get("http://localhost:8086/stocks/").then(function (response) {
        $scope.stocks = response.data;
    });

    function refreshStocks() {
        $http.get("http://localhost:8086/stocks/").then(function (response) {
            $scope.stocks = response.data;
        });
    }

    $http.get("http://localhost:8086/requests/user/"+stcuserID).then(function (response) {
        $scope.requests = response.data;
    });

    refreshRequests();
    function refreshRequests() {
        $http.get("http://localhost:8086/requests/user/"+stcuserID).then(function (response) {
            $scope.requests = response.data;
        });
    }

    refreshMyRequests();
    function refreshMyRequests() {
        $http.get("http://localhost:8086/requests").then(function (response) {
            $scope.allReqs = response.data;
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

    $scope.addRequest = function (quantity,stock) {

        var quantity2 = $("#name_" + quantity).text();
        var stock2 = $("#q_" + quantity).val()

        //alert("Sending request of " + quantity2 + " to " + stock2);

        var reqAmount = stock2;
        var newRequest = {

            userID:stcuserID,//The user ID should be taken from the current login session
            requestID: "REQ"+Date.now(),
            drug:quantity2,
            date:currentdate,
            amount:parseInt(reqAmount),
            department:"Sub Department",
            status:"pending"
        };

        if(reqAmount != null || !isNaN(newRequest.amount)) {
           $http.post("http://localhost:8086/requests", newRequest).then(function (response) {
               alert("Request sent successfully!");
               refreshStocks();
           }, function (response) {
               alert("Requesting Failed!")
           });
       }else{
        alert("Please enter a valid request quantity!");
    }


};

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
                refreshMyRequests();
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
                refreshMyRequests();
            }, function (response) {
                alert("Request Rejecting Failed !")
            });

    };
});

