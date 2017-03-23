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
    console.log("Test PharmacyModule Running On localhost:8080");
});

//Default Route
app.get('/', function (request, response) {
    response.end("Hello !");
});

app.get('/fire', function (request, response) {
    database.collection("trains").find().toArray(function (error, result) {
        if (error) {
            response.status(500);
            console.log(error);
            response.json(error);
        } else {
            response.status(200);
            console.log(result);
            response.json(result);
        }
    });
});


