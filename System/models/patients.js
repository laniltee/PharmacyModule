/* 
 * Database operations related to patients is compiled in this file
 * See the description of each function for more information
 * Commited By Lanil On 12/03/2014
 */

//Database Setup
var database = require('mongoskin').db('mongodb://127.0.0.1:27017/pharmacy');

var serverError = 500;
var statusSuccess = 200;
var statusDone = 201;

//Returns all the patients in the database
exports.getAllPatients = function (response) {
    database.collection("patients").find().toArray(function (error, result) {
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
exports.getPatient = function (patientIdIn, response) {
    database.collection("patients").find({patientId: patientIdIn}).toArray(function (error, result) {
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
exports.addPatient = function (request, response) {

    database.collection("patients").insert(request.body, function (error, result) {
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

exports.deletePatient = function (pId, response) {
    database.collection('patients').remove({patientId: pId}, function (error, result) {
        if (!error) {
            response.status(200);
            response.end();
        } else {
            response.status(serverError);
            response.json(error);
        }

    });
};
