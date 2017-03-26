/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var app = angular.module("PharmacyModule", ["ngRoute"]);

var loggerUser = "Nisha Hewage";
var loggedUserType = "Chief Pharmacist";

app.config(function ($routeProvider, $locationProvider) {
    $locationProvider.hashPrefix('');
    $routeProvider
            .when("/", {
                templateUrl: "views/DecksHome.html",
                controller: "decksController"
            })
            .when("/stock", {
                templateUrl: "views/MainStockTable.html",
                controller: "StockController"
            })
            .when("/paris", {
                templateUrl: "paris.htm"
            });
});
