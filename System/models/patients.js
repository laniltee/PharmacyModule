/* 
 * Database operations related to patients is compiled in this file
 * See the description of each function for more information
 * Commited By Lanil On 12/03/2014
 */

//Database Setup
var database = require('mongoskin').db('mongodb://localhost:27017/pharmacy');

//Returns all the patients in the database
exports.getAllPatients = function (response) {
    database.collection("patients").find().toArray(function (error, result) {
        if (error) {
            var errorResult = {"status": 500, "message": error.toString()};
            console.log("Collection Patients Fetch Failed :(");
            response.end(JSON.stringify(errorResult));
        } else {
            var finalResult = {"status": 200, "message": "success", "count": result.length, "results": result};
            console.log("Collection Patients Fetch Success :)");
            response.end(JSON.stringify(finalResult));
        }
    });
};

//Returns the patient object which holds the given id
exports.getPatient = function (patientIdIn, response) {
    database.collection("patients").find({patientId: parseInt(patientIdIn)}).toArray(function (error, result) {
        if (error) {
            var errorResult = {"status": 500, "message": error.toString()};
            console.log("Collection Patients Fetch Failed :(");
            response.end(JSON.stringify(errorResult));
        } else {
            var finalResult = {"status": 200, "message": "success", "request": parseInt(patientIdIn), "count": result.length, "results": result};
            console.log("Collection Patients Fetch Success :)");
            response.end(JSON.stringify(finalResult));
        }
    });
};

//Adds new patient to the database
exports.addPatient = function (request, response) {
    database.collection("patients").insert({patientId: parseInt(request.body.id), name: request.body.name}, function (error, result) {
        if (error) {
            var errorResult = {"status": 500, "message": error.toString()};
            response.status(500);
            response.end(JSON.stringify(errorResult));
        } 
        
        if(result) {
            var successResult = {"status": 200, "message": "Added", "object": request.body};
            response.status(200);
            response.end(JSON.stringify(successResult));
        }
    });
};
