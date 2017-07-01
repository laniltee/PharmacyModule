/* 
 * Group Name: codeSharks
 * Batch: Weekend Software Engineering
 * Memebers: Movinda, Lanil, Supun, Phillips
 */

//---------------------ExpressJS Setup & Required Libraries---------------------
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cors = require('cors');


var app = express();
app.use(bodyParser.json());
app.use(cors());




/////Database Connection

mongoose.connect('mongodb://127.0.0.1/supplier');

/////supplier schemas


const suppliers = mongoose.model('suppliers', {name:String, 
    email:String,
    address:String,
    contact:String});

const orderdetails = mongoose.model('orderdetails',{ID: String,
    date:String,
    name:String,
    suppliername:String,
    supplierID: String,
    orderCatergory:String,
    containerA:String,
    containerB:String,
    containerC:String,
    orderstatus:String
    
});

var bodyParser = require('body-parser');
app.use(bodyParser.json());

//---------------------Loading Models---------------------
//var patients = require('./models/patients');
//var users = require('./models/users.new');







//---------------------Loading Models End---------------------\\

//Server Startup
app.listen(8090, function () {
    console.log("\n +-+-+-+-+-+-+-+-+-+-+\n |c|o|d|e|S|h|a|r|k|s|\n +-+-+-+-+-+-+-+-+-+-+");
    console.log("  ____  _                                           \n" +
            " |  _ \\| |__   __ _ _ __ _ __ ___   __ _  ___ _   _ \n" +
            " | |_) | '_ \\ / _` | '__| '_ ` _ \\ / _` |/ __| | | |\n" +
            " |  __/| | | | (_| | |  | | | | | | (_| | (__| |_| |\n" +
            " |_|   |_| |_|\\__,_|_|  |_| |_| |_|\\__,_|\\___|\\__, |\n" +
            "                                              |___/ ");
    console.log(" Running On 127.0.0.1:8080");
});

app.get("/suppliers", function(req,res){
    console.log("Route called");
    suppliers.find(function(error, suppliers){
        if (error){
            console.log("ERROR-FETCHING SUPPLIERS FROM DATABASE FAILED");
            res.end();
        }
        console.log("FETCHING SUPPLIERS FROM DATABASE SUCCESS");
        res.json(suppliers);
    });
   });
   
//delete a supplier
app.delete("/suppliers/:name", function(req, res){
	var reqId = req.params.name;
	console.log("[ROUTE CALLED][DELETE] /suppliers/" + reqId);
	suppliers.deleteOne({name: reqId}, function(error, suppliers){
		if(error){
			console.log("[ERROR] DELETING ONE SUPPLIER FROM DATABASE FAILED");
			res.end();
		}
		console.log("[DB] DELETING ONE SUPPLIER FROM DATABASE SUCCESS");
		res.json(suppliers);
	});
});


app.post("/suppliers", function(req, res){
	console.log("[ROUTE CALLED][POST] /suppliers");

	var newSupplier = new suppliers(req.body);
	
	newSupplier.save(function (error, newSupplier){
		if(error){
			console.log("[ERROR] ADDING A NEW SUPPLIER TO DATABASE FAILED");
			res.end();
		}
		console.log("[DB] ADDING A NEW SUPPLIER TO DATABASE SUCCESS");
		res.json(newSupplier);
	});
});


//Updating Supplier details
app.put('/suppliers/:name/:email', function (req, res) {
    var reqId = req.params.name;
	console.log("[ROUTE CALLED][PUT] /suppliers/" + reqId);
	suppliers.findOne({name: reqId}, function(error, suppliers){
		if(error){
			console.log("[ERROR] Updating ONE SUPPLIER FROM DATABASE FAILED");
			res.end();
		}
                suppliers.email=req.params.email;
                suppliers.save(function (error, suppliers){
                    if(error){
                        res.status(500).end();
                    }
                    res.json(suppliers);
                });
	});
});

//Fetching Order details
app.get("/orderdetails", function(req,res){
    console.log("Route called");
    orderdetails.find(function(error, orderdetails){
        if (error){
            console.log("ERROR-FETCHING ORDER-DETAILS FROM DATABASE FAILED");
            res.end();
        }
        console.log("FETCHING ORDER-DETAILS FROM DATABASE SUCCESS");
        res.json(orderdetails);
    });
   });
   
   
  app.get("/orderdetails/:id", function(req, res){
	var reqId = req.params.id;
	console.log("[ROUTE CALLED][GET] /orderdetails/" + reqId);
	orderdetails.findOne({id: reqId}, function(error, orderdetails){
		if(error){
			console.log("[ERROR] FETCHING ONE DEPARTMENT FROM DATABASE FAILED");
			res.end();
		}
		console.log("[DB] FETCHING ONE DEPARTMENT FROM DATABASE SUCCESS");
		res.json(orderdetails);
	});
})





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