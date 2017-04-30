/* 
 * Group Name: codeSharks
 * Batch: Weekend Software Engineering
 * Memebers: Movinda, Lanil, Supun, Phillips
 */

//---------------------ExpressJS Setup & Required Libraries---------------------
var express = require('express');
var app = express();

var database = require('mongoskin').db('mongodb://localhost/sliit');

var bodyParser = require('body-parser');
app.use(bodyParser.json());

//---------------------Loading Models---------------------
//var patients = require('./models/patients');
//var users = require('./models/users.new');







//---------------------Loading Models End---------------------\\

//Server Startup
app.listen(8080, function () {
    console.log("\n +-+-+-+-+-+-+-+-+-+-+\n |c|o|d|e|S|h|a|r|k|s|\n +-+-+-+-+-+-+-+-+-+-+");
    console.log("  ____  _                                           \n" +
            " |  _ \\| |__   __ _ _ __ _ __ ___   __ _  ___ _   _ \n" +
            " | |_) | '_ \\ / _` | '__| '_ ` _ \\ / _` |/ __| | | |\n" +
            " |  __/| | | | (_| | |  | | | | | | (_| | (__| |_| |\n" +
            " |_|   |_| |_|\\__,_|_|  |_| |_| |_|\\__,_|\\___|\\__, |\n" +
            "                                              |___/ ");
    console.log(" Running On 127.0.0.1:8080");
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

//Log In and Log Out functions
var dummyUsers = [{username: "cp", fullname: "Chief Pharmacist", password: "cp123", type: "CP"},
    {username: "ap", fullname: "Assistant Pharmacist", password: "ap123", type: "AP"}];
app.get('/login', function (request, response) {
    response.sendFile(__dirname + "\\login.html");
});

app.post('/authentication', function (request, response) {

    var validated = false;
    var reqUser = request.body.username;
    var reqPassword = request.body.password;
    var validatedFullName = "";
    var validatedType = "";

    for (var i = 0; i < dummyUsers.length; i++) {
        if (dummyUsers[i].username == reqUser && dummyUsers[i].password == reqPassword) {
            validated = true;
            validatedFullName = dummyUsers[i].fullname;
            validatedType = dummyUsers[i].type;
            break;
        }
    }

    if (validated) {
        var successObject = {
            fullname: validatedFullName,
            type: validatedType
        };
        response.status(200);
        response.json(successObject);
    } else {
        response.status(500);
    }
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

//Gets a user
app.get('/users/:userId', function (request, response) {
    users.getUser(request.params.userId, response);
});

//Add new user
app.post('/users', function (request, response) {
    users.addUser(request.body, response);
});

//Removes a user
app.delete('/users/:userId', function (request, response) {
    users.removeUser(request.params.userId, response);
});

app.put('/users/:userId', function (request, response) {
    users.updateUser(request.params.userId, request.body, response);
});