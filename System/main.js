/* 
 * Group Name: codeSharks
 * Batch: Weekend Software Engineering
 * Memebers: Movinda, Lanil, Supun, Phillips
 */

//---------------------ExpressJS Setup & Required Libraries---------------------
var express = require('express');
var app = express();

var database = require('mongoskin').db('mongodb://localhost:27017/sliit');

var bodyParser = require('body-parser');
app.use(bodyParser.json());

//---------------------Loading Models---------------------
var patients = require('./models/patients');
var users = require('./models/users');




//---------------------Loading Models End---------------------\\

//Server Startup
app.listen(8080, function () {
    console.log("PharmacyModule Running On localhost:8080");
});

//Default Route
app.get('/', function (request, response) {
    response.sendFile(__dirname + "\\index.html");
});

//---------------------Setting Public Folders---------------------
app.use(express.static('public'));
app.use("/bootstrap", express.static(__dirname + '/assets/bootstrap'));
app.use("/build", express.static(__dirname + '/assets/build'));
app.use("/dist", express.static(__dirname + '/assets/dist'));
app.use("/documentation", express.static(__dirname + '/assets/documentation'));
app.use("/pages", express.static(__dirname + '/assets/pages'));
app.use("/plugins", express.static(__dirname + '/assets/plugins'));
app.use("/", express.static(__dirname + '/'));
//---------------------Setting Public Folders End---------------------

//Checking Database Connection
app.get('/databaseCheck', function (request, response) {
    database.collection("trains").find().toArray(function (error, result) {
        if (error) {
            var errorResult = {"status": 500, "message": error.toString()};
            console.log("Collection Fetch Failed :( " + error.message);
            response.end(JSON.stringify(errorResult));
        } else {
            var finalResult = {"status": 200, "message": "success", "count": result.length, "results": result};
            console.log("Collection Fetch Success :)");
            response.end(JSON.stringify(finalResult));
        }
    });
});

//Using a model to fetch patient data
app.get('/patients', function (request, response) {
    patients.getAllPatients(response);
});

//Using a model to fetch user data
app.get('/users', function (request, response) {
    users.getAllUsers(response);
});

//Loads login page
app.get('/login', function (request, response) {
    response.end("Login Page Clled! ");
});

//Gets one patient with id
app.get('/patients/:id', function (request, response) {
    patients.getPatient(request.params.id, response);
});

//Add new patient
app.post('/patients', function (request, response) {
    patients.addPatient(request, response);
});
