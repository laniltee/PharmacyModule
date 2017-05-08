/* 
 * Database operations related to stock is compiled in this file
 * See the description of each function for more information
 * Commited By Lanil On 12/03/2014
 */

//Database Setup
var database = require('mongoskin').db('mongodb://127.0.0.1:27017/pharmacy');

var serverError = 500;
var statusSuccess = 200;
var statusDone = 201;

//Returns all the stock in the database
exports.getAllStocks = function (response) {
    database.collection("stock").find().toArray(function (error, result) {
        if (error) {
            response.status(serverError);
            response.json(error);
        } else {
            response.status(statusSuccess);
            response.json(result);
        }
    });
};

//Returns the patient object which holds the given id
exports.getStock = function (idIn, response) {
    database.collection("stock").find({id: idIn}).toArray(function (error, result) {
        if (error) {
            response.status(serverError);
            response.json(error);
        } else {
            response.status(statusSuccess);
            response.json(result[0]);
        }
    });
};

//Adds new patient to the database
exports.addStock = function (request, response) {

    database.collection("stock").insert(request, function (error, result) {
        if (error) {
            response.status(serverError);
            response.json(error);
        }

        if (result) {
            response.status(statusDone);
            response.json(request.body);
        }
    });
};

exports.deleteStock = function (pId, response) {
    database.collection('stock').remove({id: pId}, function (error, result) {
        if (!error) {
            response.status(200);
            response.end();
        } else {
            response.status(serverError);
            response.json(error);
        }

    });
};
