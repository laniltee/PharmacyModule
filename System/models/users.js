/* 
 * Database operations related to users of the system is compiled in this file
 * See the description of each function for more information
 * Commited By Lanil On 12/03/2014
 */

//Database Setup
var database = require('mongoskin').db('mongodb://localhost:27017/pharmacy');

var serverError = 500;
var statusSuccess = 200;
var statusDone = 201;

//Returns all the users in the database
exports.getAllUsers = function (response) {
    database.collection("users").find().toArray(function (error, result) {
        if (error) {
            response.status(500);
            response.json(error);
        } else {
            response.status(200);
            response.json(result);
        }
    });
};

