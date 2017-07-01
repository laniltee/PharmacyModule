/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

 app.controller("StockController", function ($scope, $http, $window, $route, $routeParams) {

    //page script for data table
//    $("#example1").DataTable();
//    $('#example2').DataTable({
//        "paging": true,
//        "lengthChange": false,
//        "searching": false,
//        "ordering": true,
//        "info": true,
//        "autoWidth": false
//    });

$scope.checkVal = "Stock Controller";
var jsonHeaderObject = {headers: {'Content-Type': 'application/json'}};

var stockId = $routeParams.id;

$scope.currentStock = {};


if(stockId != null){
    $http.get("http://localhost:8080/stock/"+ stockId).then(function(response){
        $scope.currentStock = response.data;
        console.log("Stock " + stockId);
        console.log($scope.currentStock);
    });
}

$scope.allStock = [];


$http.get("/stock").then(function (response) {
    $scope.allStock = response.data;
});

$scope.addStock = function () {
        // var newStock = {
        //     "id": "D" + Date.now(),
        //     "name": $scope.name,
        //     "category": $scope.category,
        //     "unit": $scope.unit,
        //     "containerA": $scope.containerA,
        //     "containerB": $scope.containerB,
        //     "containerC": $scope.containerC
        // };

        // $http.post("/stock", newStock, jsonHeaderObject).then(function (response) {
        //     alert("Adding stock success");
        //     $window.location.href = "#stock";
        // }, function (response) {
        //     alert("Adding stock failed");
        // });
    };

    $scope.removeStock = function (sId) {
        if (confirm("Are you sure to delete this stock?") == true) {
            $http.delete("/stock/" + sId).then(function (response) {
                alert("Stock Deleted !");
                $route.reload();
            }, function (response) {

            });
        }

    };

    $scope.addStock = function(){
     $http.post("/stock", $scope.currentStock, jsonHeaderObject).then(function (response) {
         alert("Adding stock success");
         $window.location.href = "#stock";
     }, function (response) {
         alert("Adding stock failed");
     });
 }

 $scope.updateStock = function(sId){
    if(confirm("Sure to Update ?") == true){
        $http.delete("/stock/" + sId).then(function (response) {
            $http.post("/stock", $scope.currentStock, jsonHeaderObject).then(function (response) {
                alert("Updating stock success");
             $window.location.href = "#stock";
         }, function (response) {
             alert("Updating stock failed");
         });
        }, function (response) {

        });
    };
};
});