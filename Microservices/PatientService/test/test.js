
var request = require('request');
var assert = require('assert');

var api = require('../index.js');

var baseUrl = "http://localhost:8080/hello"

describe("Hello World Test", function(){

	describe("GET /hello", function(){

		it('returns status code 200', function(done){

			request.get(baseUrl, function(error, response, body){

				assert.equal(200, response.statusCode);
				done();

			});

		});

		it('returns hello world', function(done){

			request(baseUrl, function(error, response, body){

				assert.equal("Hello World", body);
				done();

			});

		});

	});

});