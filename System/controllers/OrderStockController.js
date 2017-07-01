/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


app.controller("OrderStockController", function ($scope, $http) {
   
   
   $scope.orderdetails = [];
   $scope.details = [];
   
   $http.get("http://localhost:8090/orderdetails").then(function (response) {
        $scope.orderdetails = response.data;
    });
    function refreshOrders() {
        $http.get("http://localhost:8090/orderdetails").then(function (response) {
            $scope.orderdetails = response.data;
        });
    }
    
    
    
    
    
    //Search for Order Details
    
   
    $scope.search = function (id) {
       

     //   if (newUser.id != null && newUser.name != null) {
      //     $http.get("http://localhost:8080/orderDetails" + id).then(function (response) {
      //         $scope.details = response.data;
      //     });
       // } else {
       //     alert("Inputs are not valid !");
       // }
       
       
   
    }
   
    
    
    
});