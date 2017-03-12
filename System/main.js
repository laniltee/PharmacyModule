/* 
 * Group Name: codeSharks
 * Batch: Weekend Software Engineering
 * Memebers: Movinda, Lanil, Supun, Phillips
 */

//ExpressJS Setup
var express = require('express');
var app = express();

//Loading Modules
var database = require('mongoskin').db('mongodb://localhost:27017/pharmacy');;
var patients = require('./models/patients');
var users = require('./models/users');




//Loading Modules End

//Server Startup
app.listen(8080, function () {
    console.log("PharmacyModule Running On localhost:8080");
});

//Default Route
app.get('/', function (request, response) {
    response.end("Hello !");
});

//Setting Public Folder
app.use(express.static('public'));

//Checking Database Connection
app.get('/databaseCheck', function (request, response) {
    database.collection("users").find().toArray(function (error, result) {
        if (error) {
            var errorResult = {"status": 500, "message": error.toString()};
            console.log("Collection Fetch Failed :(");
            response.end(JSON.stringify(errorResult));
        } else {
            var finalResult = {"status": 200, "message": "success", "count": result.length, "results": result};
            console.log("Collection Fetch Success :)");
            response.end(JSON.stringify(finalResult));
        }
    });
});

//Using a model to fetch patient data
app.get('/patients', function(request, response){
    patients.getAllPatients(response);
});

//Using a model to fetch user data
app.get('/users', function(request, response){
    users.getAllUsers(response);
});


