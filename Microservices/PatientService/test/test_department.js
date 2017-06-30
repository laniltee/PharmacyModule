
var assert = require('assert');
var request = require('request');

var baseUrl = "http://localhost:8080/departments/D001"

describe('Departments Test', function(){

	describe("-----------GET /departments/D001-----------", function(){

		it('returns status code 200', function(done){

			request.get(baseUrl, function(error, response, body){

				assert.equal(200, response.statusCode);
				done();

			});

		});

		it('returns department D001', function(done){

			request.get(baseUrl, function(error, response, body){

				var responseBody = JSON.parse(body);
				assert.equal('D001', responseBody.id);
				done();

			});

		});

		it('returns department IT', function(done){

			request.get(baseUrl, function(error, response, body){

				var responseBody = JSON.parse(body);
				assert.equal('IT', responseBody.name);
				done();

			});

		});

	});

	// describe("-----------POST /departments-----------", function(){

	// 	it('adds a new department', function(done){

	// 		var newDeparment = {
	// 			"id": "D011",
	// 			"name": "TestDept"
	// 		};

	// 		request.post("http://localhost:8080/departments/", {json: newDeparment}, function(error, response, body){

	// 			assert.equal(200, response.statusCode);
	// 			done();

	// 		});
			
	// 	});

	// });

});