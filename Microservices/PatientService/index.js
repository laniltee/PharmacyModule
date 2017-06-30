//L.T. Marasinghe - IT 15 0190 28 - Weekend Batch
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cors = require('cors');

var app = express();
app.use(bodyParser.json());
app.use(cors());

//Database connection 
mongoose.connect('mongodb://127.0.0.1/pharmacy');

//Database schemas
var patients = mongoose.model('patients', {patientId: String, age: Number, firstDate: String, name: String});
var prescriptions = mongoose.model('prescriptions', {preId: String, createdDate: String, doctor: String, total: Number, patient: String});
var items = mongoose.model('items', {preId: String, name: String, doze: String, quantity: Number, unitPrice: Number, totalPrice: Number, patient: String, itemId: String});
var presc_items = mongoose.model('presc_items', {preId: String, drug: String, dosage: String, unitPrice: Number, totalPrice: Number, quantity: Number});


//Server Startup
app.listen(8082, function(error){
	console.log("[INFO] PATIENTS API RUNNING ON http://localhost:8082/");
});

//Fetches all the patients
app.get("/patients", function(req, res){
	console.log("[ROUTE CALLED][GET] /patients");
	patients.find(function(error, patients){
		if(error){
			console.log("[ERROR] FETCHING PATIENTS FROM DATABASE FAILED");
			res.end();
		}
		console.log("[DB] PATIENTS FROM DATABASE SUCCESS");
		res.json(patients);
	});
});

//Returns one PATIENT by the ID
app.get("/patients/:id", function(req, res){
	var reqId = req.params.id;
	console.log("[ROUTE CALLED][GET] /patients/" + reqId);
	patients.findOne({patientId: reqId}, function(error, patients){
		if(error){
			console.log("[ERROR] FETCHING ONE PATIENT FROM DATABASE FAILED");
			res.json(error);
		}
		console.log("[DB] FETCHING ONE PATIENT FROM DATABASE SUCCESS");
		res.json(patients);
	});
});

//Adds new PATIENT
app.post("/patients", function(req, res){
	console.log("[ROUTE CALLED][POST] /patients");

	var newPATIENT = new patients(req.body);
	newPATIENT.age = parseInt(newPATIENT.age);

	newPATIENT.save(function (error, newPATIENT){
		if(error){
			console.log("[ERROR] ADDING A NEW PATIENT TO DATABASE FAILED");
			res.end();
		}else{
			console.log("[DB] ADDING A NEW PATIENT TO DATABASE SUCCESS");
			res.json(newPATIENT);
		}
		
	});
});

//Deletes on PATIENT
app.delete("/patients/:PATIENTId", function(req, res){
	var reqId = req.params.PATIENTId;
	console.log("[ROUTE CALLED][DELETE] /patients/" + reqId);
	patients.remove({patientId: reqId}, function(error){
		if(error){
			res.status(500);
			res.end();
		}
		res.status(200);
		res.end();
	});
});

//Updates PATIENT
app.put("/patients/:PATIENTId", function(req, res){
	var reqId = req.params.PATIENTId;
	console.log("[ROUTE CALLED][PUT] /patients/" + reqId);
	patients.findOne({id: reqId}, function(error, PATIENT){
		if(error){
			res.status(500)
			res.end();
		}
		PATIENT.name = req.body.name;
		PATIENT.save(function(error, PATIENT){
			if(error){
				res.status(500).end();
			}
			res.json(PATIENT);
		});
	});
});

//Returns one prescription by the PATIENT ID
app.get("/prescriptions/patients/:id", function(req, res){
	var reqId = req.params.id;
	console.log("[ROUTE CALLED][GET] /prescriptions/" + reqId);
	prescriptions.find({patient: reqId}, function(error, prescriptions){
		if(error){
			console.log("[ERROR] FETCHING ONE PRESCRIPTION FROM DATABASE FAILED");
			res.json(error);
		}
		console.log("[DB] FETCHING ONE PRESCRIPTION FROM DATABASE SUCCESS");
		res.json(prescriptions);
	});
});

//Adds new PRESCRIPTION
app.post("/prescriptions", function(req, res){
	console.log("[ROUTE CALLED][POST] /prescriptions");

	var newPRESCRIPTION = new prescriptions(req.body);

	newPRESCRIPTION.save(function (error, newPRESCRIPTION){
		if(error){
			console.log("[ERROR] ADDING A NEW PRESCRIPTION TO DATABASE FAILED");
			res.end();
		}else{
			console.log("[DB] ADDING A NEW PRESCRIPTION TO DATABASE SUCCESS");
			res.json(newPRESCRIPTION);
		}
		
	});
});

//Searches one ITEM by the name
app.get("/items/:id", function(req, res){
	var reqId = req.params.id;
	console.log("[ROUTE CALLED][GET] /items/" + reqId);
	items.find({name: new RegExp('^' + reqId)}, function(error, items){
		if(error){
			console.log("[ERROR] FETCHING ONE ITEM FROM DATABASE FAILED");
			res.json(error);
		}
		console.log("[DB] FETCHING ONE ITEM FROM DATABASE SUCCESS");
		res.json(items);
	});
});

//Returns drugs in a prescriptions
app.get("/presc_items/prescriptions/:id", function(req, res){
	var reqId = req.params.id;
	console.log("[ROUTE CALLED][GET] /presc_items/prescriptions/" + reqId);
	presc_items.find({preId: reqId}, function(error, presc_items){
		if(error){
			console.log("[ERROR] FETCHING ONE PRESCRIPTION ITEM FROM DATABASE FAILED");
			res.json(error);
		}
		console.log("[DB] FETCHING ONE PRESCRIPTION ITEM FROM DATABASE SUCCESS");
		res.json(presc_items);
	});
});

//Adds new item to a prescription
app.post("/presc_items", function(req, res){
	console.log("[ROUTE CALLED][POST] /presc_items");

	var newPRESCRIPTION = new presc_items(req.body);

	newPRESCRIPTION.save(function (error, newPRESCRIPTION){
		if(error){
			console.log("[ERROR] ADDING A NEW PRESCRIPTION ITEM TO DATABASE FAILED");
			res.end();
		}else{
			console.log("[DB] ADDING A NEW PRESCRIPTION ITEM TO DATABASE SUCCESS");
			res.json(newPRESCRIPTION);
		}
		
	});
});

//Deletes prescription
app.delete("/prescriptions/:id", function(req, res){
	var reqId = req.params.id;
	console.log("[ROUTE CALLED][DELETE] /prescriptions/" + reqId);
	prescriptions.remove({preId: reqId}, function(error){
		if(error){
			res.status(500);
			res.end();
		}
		res.status(200);
		res.end();
	});
});

//Returns one ITEM by the name
app.get("/items_one/:id", function(req, res){
	var reqId = req.params.id;
	console.log("[ROUTE CALLED][GET] /items/" + reqId);
	items.findOne({name: reqId}, function(error, items){
		if(error){
			console.log("[ERROR] FETCHING ONE ITEM FROM DATABASE FAILED");
			res.json(error);
		}
		console.log("[DB] FETCHING ONE ITEM FROM DATABASE SUCCESS");
		res.json(items);
	});
});

//Dispensing prescription -> Calculating total and reducing stock
app.get("/dispense/:id", function(req, res){

});

//Get available stock
//Fetches all the patients
app.get("/items", function(req, res){
	console.log("[ROUTE CALLED][GET] /items");
	items.find(function(error, items){
		if(error){
			console.log("[ERROR] FETCHING ITEMS FROM DATABASE FAILED");
			res.end();
		}
		console.log("[DB] ITEMS FROM DATABASE SUCCESS");
		res.json(items);
	});
});




