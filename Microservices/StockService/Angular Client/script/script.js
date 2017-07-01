/**
 * M.M.M.S. Rupasinghe
 * IT 15017284
 */
 
var app = angular.module("myApp",[]);


app.controller("myCtrl",function ($scope,$http){

    $scope.stocks = [];

    $http.get("http://localhost:8088/stock").then(function (response) {
        $scope.stocks = response.data;
    });

    function refreshStock() {
        $http.get("http://localhost:8088/stock").then(function (response) {
            $scope.stocks = response.data;
        });
    }
	
	
    $scope.deleteStock = function (requestID) {

        var delStock = requestID;

            $http.delete("http://localhost:8088/stock/" + delStock).then(function (response) {
                alert("Stock Item Deleted Successfully!");
                refreshStock();
            }, function (response) {
                alert("Stock Item Deleting Failed !")
            });

    };
	
	$scope.viewItem = function(requestID){
		$http.get("http://localhost:8088/stock/"+ requestID).then(function(response){
			
		});
	};
	
	

});

