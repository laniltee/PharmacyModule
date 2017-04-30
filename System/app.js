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
            .when("/stock", {
                templateUrl: "views/MainStockTable.html",
                controller: "StockController"
            })
            .when("/stock/add", {
                templateUrl: "views/AddNewStock.html",
                controller: "StockController"
            })
            .when("/stock/:id/add", {
                templateUrl: "views/AddNewBatch.html",
                controller: "StockController"
            })
            .when("/stock/:id/edit", {
                templateUrl: "views/EditStock.html",
                controller: "StockController"
            })
            .when("/stock/:id/order", {
                templateUrl: "views/OrderStock.html",
                controller: "StockController"
            })
            .when("/users", {
                templateUrl: "views/Users.html",
                controller: "UserController"
            })
            .when("/requests", {
                templateUrl: "views/ViewRequests.html",
                controller: "RequestsController"
            })
            .when("/front_stock", {
                templateUrl: "views/FrontStock.html",
                controller: "StockController"
            })
            .when("/front_requests", {
                templateUrl: "views/FrontRequests.html",
                controller: "RequestsController"
            })
            .when("/prescriptions", {
                templateUrl: "views/Prescriptions.html",
                controller: "PrescriptionsController"
            })
            .when("/prescriptions/add", {
                templateUrl: "views/AddPrescription.html",
                controller: "PrescriptionsController"
            })
            .when("/suppliers", {
                templateUrl: "views/Suppliers.html",
                controller: "SuppliersController"
            });
});
