/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

app.controller("LoginController", function ($scope, $http, $window) {

    var loggedUser = sessionStorage.getItem("username");
    var loggedUserType = sessionStorage.getItem("usertype");
    
    $scope.sidebar = "includes/aside.html";
    
    if(loggedUserType == "cp"){
        $scope.sidebar = "includes/aside.html";
    }
    if(loggedUserType == "ap"){
        $scope.sidebar = "includes/aside2.html";
    }
    
    $scope.checkVal = "Stock Controller";
    $scope.loggedUser = loggedUser;
    $scope.userType = loggedUserType;
    

    $scope.signOut = function () {
        if (confirm("Are You Sure To Sign Out ?") === true) {
            sessionStorage.removeItem("username");
            sessionStorage.removeItem("usertype");
            $window.location.href = "/login";
        }

    };
});

