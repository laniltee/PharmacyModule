
var request = require('request');
var assert = require('assert');

var baseUrl = "http://localhost:8082/patients"

describe("Patients API Test", function(){

	describe("GET /patients", function(){

		it('it returns status code 200', function(done){

			request.get(baseUrl, function(error, response, body){

				assert.equal(200, response.statusCode);
				done();

			});

		});

		it('it returns a list of patients', function(done){

			request(baseUrl, function(error, response, body){

				assert.equal(200, response.statusCode);
				done();

			});

		});

	});

});