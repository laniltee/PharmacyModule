/**
 * M.M.M.S. Rupasinghe
 * IT 15017284
 */
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cors = require('cors');

var app = express();
app.use(bodyParser.json());
app.use(cors());

var database = require('mongoskin').db('mongodb://localhost/sliit');

//Database Connection
mongoose.connect('mongodb://127.0.0.1/pharmacy');

//Database schemas for requests and stocks objects
var stockSchema = mongoose.Schema(
	{stockId: String,drugName: String,brandName: String,unit: String,noOfPacks: Number,qtyInPack: Number,total: Number,buyingAt: Number,sellingAt: Number,batchId: String,expDate: String,mfDate: String,rcvDate: String,supplier: String,comments: String }
);

var stock = mongoose.model('stock', stockSchema);

var test = mongoose.model('test', {name: String, age: Number});

//server startup
app.listen(8089, function (error) {
    console.log("\n +-+-+-+-+-+-+-+-+-+-+\n |c|o|d|e|S|h|a|r|k|s|\n +-+-+-+-+-+-+-+-+-+-+");
    console.log("  ____  _                                           \n" +
        " |  _ \\| |__   __ _ _ __ _ __ ___   __ _  ___ _   _ \n" +
        " | |_) | '_ \\ / _` | '__| '_ ` _ \\ / _` |/ __| | | |\n" +
        " |  __/| | | | (_| | |  | | | | | | (_| | (__| |_| |\n" +
        " |_|   |_| |_|\\__,_|_|  |_| |_| |_|\\__,_|\\___|\\__, |\n" +
        "                                              |___/ ");
    console.log("[INFO] PHARMACY REQUESTS API RUNNING ON http://localhost:8089/");
});

app.get('/', function (request, response) {
    response.sendFile(__dirname + '/Angular Client/index.html');
});

app.get('/test', function(req, response){
	database.collection("stock").find().toArray(function (error, result) {
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

//Get all stocks
app.get("/stock",function (req,res) {
    console.log("[ROUTE CALLED][GET] /stock");
    stock.find(function (error,stock) {
        if(error){
            console.log("[ERROR] FETCHING STOCKS FROM DATABASE FAILED");
            res.end();
        }
		console.log(stock);
        console.log("[DB] FETCHING STOCKS FROM DATABASE SUCCESS");
        res.json(stock);
    });
});

//Find stock by stockId
app.get("/stock/:stockId",function (req,res) {
    var reqId=req.params.stockId;
    stock.find({stockId:reqId},function (error,stock) {
        if(error){
            console.log("[ERROR] FETCHING SPECIFIC REQUESTS FROM DATABASE FAILED");
            res.end();
        }
        console.log("[DB] FETCHING SPECIFIC REQUESTS FROM DATABASE SUCCESS");
        res.json(stock);
    });
});

//Find stock by batchId
app.get("/stock/:batchId",function (req,res) {
    var reqId=req.params.batchId;
    stock.find({requestID:reqId},function (error,stock) {
        if(error){
            console.log("[ERROR] FETCHING SPECIFIC REQUESTS FROM DATABASE FAILED");
            res.end();
        }
        console.log("[DB] FETCHING SPECIFIC REQUESTS FROM DATABASE SUCCESS");
        res.json(stock);
    });
});

//Find stock by drugName
app.get("/stock/:drugName",function (req,res) {
    var reqName=req.params.drugName;
    stock.find({drugName:reqName},function (error,stock) {
        if(error){
            console.log("[ERROR] FETCHING SPECIFIC REQUESTS FROM DATABASE FAILED");
            res.end();
        }
        console.log("[DB] FETCHING SPECIFIC REQUESTS FROM DATABASE SUCCESS");
        res.json(stock);
    });
});

//Add new item to stock
app.post("/stock",function (req,res) {
    console.log("[ROUTE CALLED][POST] /stock");

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
app.delete("/stock/:stockId",function (req,res) {

    var delId = req.params.stockId;

    console.log("[ROUTE CALLED][DELETE] /stock/" + delId);
    stock.deleteOne({stockId:delId},function (error,stock) {
        if(error){
            console.log("[ERROR] DELETING ONE REQUEST FAILED");
            res.end();
        }
        console.log("[DB] DELETING ONE REQUEST SUCCESS");
        res.json(stock);
    });
});


//update stock
app.put("/stock/:stockId",function (req,res) {
    var reqId = req.params.stockId;
    console.log("[ROUTE CALLED][PUT] /stock/" + reqId);
    stock.findOne({stockId:reqId}, function (error,stock) {
        if(error){
            res.status(500);
            res.end();
        }
        stock.status = req.body.status;
        stock.save(function (error,stock) {
            if(error){
                res.status(500).end();
            }
            res.json(stock);
        });
    });
});

