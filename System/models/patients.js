/* 
 * Database operations related to users of the system is compiled in this file
 * See the description of each function for more information
 * Commited By Lanil On 12/03/2014
 */

//Database Setup
var database = require('mongoskin').db('mongodb://localhost:27017/pharmacy');

//Returns all the patients in the database
exports.getAllPatients = function () {
    database.collection("users").find().toArray(function (error, result) {
        if (error) {
            var errorResult = {"status": 500, "message": error.toString()};
            console.log("Collection Patients Fetch Failed :(");
            //return (JSON.stringify(errorResult));
            return "Yes Patients";
        } else {
            var finalResult = {"status": 200, "message": "success", "count": result.length, "results": result};
            console.log("Collection Patients Fetch Success :)");
            //return (JSON.stringify(finalResult));
            return "No Patients";
        }
    });
};
