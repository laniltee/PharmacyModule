var assert = require('assert');
var request = require('request');

var baseUrl = "http://localhost:8080/students"

describe('Students Test', function(){

	describe("GET /students", function(){

		it('returns status code 200', function(done){

			request.get(baseUrl, function(error, response, body){

				assert.equal(200, response.statusCode);
				done();

			});

		});

		it('returns 4 students', function(done){

			request.get(baseUrl, function(error, response, body){

				var result = JSON.parse(body)
				assert.equal(4, result.length);
				done();

			});
		});

	});

});