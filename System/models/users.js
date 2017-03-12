/* 
 * Database operations related to users of the system is compiled in this file
 * See the description of each function for more information
 * Commited By Lanil On 12/03/2014
 */

//Database Setup
var database = require('mongoskin').db('mongodb://localhost:27017/pharmacy');

//Returns all the users in the database
exports.getAllUsers = function (response) {
    database.collection("users").find().toArray(function (error, result) {
        if (error) {
            var errorResult = {"status": 500, "message": error.toString()};
            console.log("Collection Users Fetch Failed :(");
            response.end(JSON.stringify(errorResult));
        } else {
            var finalResult = {"status": 200, "message": "success", "count": result.length, "results": result};
            console.log("Collection Users Fetch Success :)");
            response.end(JSON.stringify(finalResult));
        }
    });
};

