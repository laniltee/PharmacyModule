/* 
 * Group Name: codeSharks
 * Batch: Weekend Software Engineering
 * Memebers: Movinda, Lanil, Supun, Phillips
 */

//---------------------ExpressJS Setup & Required Libraries---------------------
//---------------------Loading Models---------------------
var express = require('express');
var app = express();
var patients = require('./models/patients');
var users = require('./models/users.new');
var stock = require('./models/stock.mongoskin');
var mongoose = require('mongoose');
var cors = require('cors');

var database = require('mongoskin').db('mongodb://localhost/sliit');

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(cors());



//Database Connection
mongoose.connect('mongodb://localhost/pharmacy_requests');

//Database schemas for requests and stocks objects
var requests = mongoose.model('requests',{userID: String, requestID: String, drug:String, date:String, amount:Number, department:String, status:String});
var stocks = mongoose.model('stocks',{userID: String, stockID: String, department:String,drug:String, category:String, unit:String, totalQty:Number});





//---------------------Loading Models End---------------------\\

//Server Startup
app.listen(8086, function () {
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

//Deletes a patient
app.delete('/patients/:pId', function(request, response){
    patients.deletePatient(request.params.pId, response);
});

//Returns all stock
app.get('/stock', function (request, response) {
    stock.getAllStocks(response);
});

//Returns all stock
app.get('/stock/:id', function (request, response) {
    stock.getStock(request.params.id, response);
});

//Add new stock
app.post('/stock', function (request, response) {
    stock.addStock(request.body, response);
});

//Deletes a stock
app.delete('/stock/:sId', function(request, response){
    stock.deleteStock(request.params.sId, response);
});



//Get all requests
app.get("/requests",function (req,res) {
    console.log("[ROUTE CALLED][GET] /requests");
    requests.find(function (error,requests) {
        if(error){
            console.log("[ERROR] FETCHING REQUESTS FROM DATABASE FAILED");
            res.end();
        }
        console.log("[DB] FETCHING REQUESTS FROM DATABASE SUCCESS");
        res.json(requests);
    });
});

//Get all stocks
app.get("/stocks",function (req,res) {
    console.log("[ROUTE CALLED][GET] /stocks");
    stocks.find(function (error,stocks) {
        if(error){
            console.log("[ERROR] FETCHING STOCKS FROM DATABASE FAILED");
            res.end();
        }
        console.log("[DB] FETCHING STOCKS FROM DATABASE SUCCESS");
        res.json(stocks);
    });
});

//Find requests by userID
app.get("/requests/user/:userId",function (req,res) {
    var reqId=req.params.userId;
    console.log("[ROUTE CALLED][GET] /requests/" + reqId);
    requests.find({userID:reqId},function (error,requests) {
        if(error){
            console.log("[ERROR] FETCHING SPECIFIC REQUESTS FROM DATABASE FAILED");
            res.end();
        }
        console.log("[DB] FETCHING SPECIFIC REQUESTS FROM DATABASE SUCCESS");
        res.json(requests);
    });
});

//Find requests by requestID
app.get("/requests/:requestsId",function (req,res) {
    var reqId=req.params.requestsId;
    console.log("[ROUTE CALLED][GET] /requests/" + reqId);
    requests.find({requestID:reqId},function (error,requests) {
        if(error){
            console.log("[ERROR] FETCHING SPECIFIC REQUESTS FROM DATABASE FAILED");
            res.end();
        }
        console.log("[DB] FETCHING SPECIFIC REQUESTS FROM DATABASE SUCCESS");
        res.json(requests);
    });
});

//Find stocks by userID
app.get("/stocks/:userId",function (req,res) {
    var reqId=req.params.userId;
    console.log("[ROUTE CALLED][GET] /stocks/" + reqId);
    stocks.find({userID:reqId},function (error,stocks) {
        if(error){
            console.log("[ERROR] FETCHING SPECIFIC STOCKS FROM DATABASE FAILED");
            res.end();
        }
        console.log("[DB] FETCHING SPECIFIC STOCKS FROM DATABASE SUCCESS");
        res.json(stocks);
    });
});

//Find stocks by Drug Name
app.get("/stocks/drug/:drugs",function (req,res) {
    var reqId=req.params.drugs;
    console.log("[ROUTE CALLED][GET] /stocks/" + reqId);
    stocks.find({drug:reqId},function (error,stocks) {
        if(error){
            console.log("[ERROR] FETCHING SPECIFIC DRUG STOCK FROM DATABASE FAILED");
            res.end();
        }
        console.log("[DB] FETCHING SPECIFIC DRUG STOCK FROM DATABASE SUCCESS");
        res.json(stocks);
    });
});


//Add new request
app.post("/requests",function (req,res) {
    console.log("[ROUTE CALLED][POST] /requests");

    var newRequest = new requests(req.body);

    newRequest.save(function (error,newRequest) {
        if(error){
            console.log("[ERROR] ADDING A NEW REQUEST TO DATABASE FAILED");
            res.end();
        }
        console.log("[DB] ADDING A NEW REQUEST TO DATABASE SUCCESS");
        res.json(newRequest);
    });
});

//Delete a request
app.delete("/requests/:id",function (req,res) {

    var delId = req.params.id;

    console.log("[ROUTE CALLED][DELETE] /requests/" + delId);
    requests.deleteOne({requestID:delId},function (error,requests) {
        if(error){
            console.log("[ERROR] DELETING ONE REQUEST FAILED");
            res.end();
        }
        console.log("[DB] DELETING ONE REQUEST SUCCESS");
        res.json(requests);
    });
});


//update requests(Accept or Reject drug requests)
app.put("/requests/:requestsId",function (req,res) {
    var reqId = req.params.requestsId;
    console.log("[ROUTE CALLED][PUT] /requests/" + reqId);
    requests.findOne({requestID:reqId}, function (error,requests) {
        if(error){
            res.status(500);
            res.end();
        }
        requests.status = req.body.status;
        requests.save(function (error,requests) {
            if(error){
                res.status(500).end();
            }
            res.json(requests);
        });
    });
});


//Edit assistant pharmacist request
app.put("/requests/edit/:requestsId",function (req,res) {
    var reqId = req.params.requestsId;
    console.log("[ROUTE CALLED][PUT] /requests/edit/" + reqId);
    requests.findOne({requestID:reqId}, function (error,requests) {
        if(error){
            res.status(500);
            res.end();
        }
        requests.amount = req.body.amount;
        requests.save(function (error,requests) {
            if(error){
                res.status(500).end();
            }
            res.json(requests);
        });
    });
});
