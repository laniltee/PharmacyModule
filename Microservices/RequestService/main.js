/**
 * Created by thisura on 6/21/17.
 */
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cors = require('cors');

var app = express();
app.use(bodyParser.json());
app.use(cors());

//Database Connection
mongoose.connect('mongodb://localhost/pharmacy_requests');

//Database schemas for requests and stocks objects
var requests = mongoose.model('requests',{userID: String, requestID: String, drug:String, date:String, amount:Number, department:String, status:String});
var stocks = mongoose.model('stocks',{userID: String, stockID: String, department:String,drug:String, category:String, unit:String, totalQty:Number});

//server startup
app.listen(8086, function (error) {
    console.log("\n +-+-+-+-+-+-+-+-+-+-+\n |c|o|d|e|S|h|a|r|k|s|\n +-+-+-+-+-+-+-+-+-+-+");
    console.log("  ____  _                                           \n" +
        " |  _ \\| |__   __ _ _ __ _ __ ___   __ _  ___ _   _ \n" +
        " | |_) | '_ \\ / _` | '__| '_ ` _ \\ / _` |/ __| | | |\n" +
        " |  __/| | | | (_| | |  | | | | | | (_| | (__| |_| |\n" +
        " |_|   |_| |_|\\__,_|_|  |_| |_| |_|\\__,_|\\___|\\__, |\n" +
        "                                              |___/ ");
    console.log("[INFO] PHARMACY REQUESTS API RUNNING ON http://localhost:8086/");
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
        requests.save(function (error,department) {
            if(error){
                res.status(500).end();
            }
            res.json(requests);
        });
    });
});

