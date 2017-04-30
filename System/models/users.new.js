/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var mongoose = require('mongoose');
mongoose.connect("localhost/pharmacy");

var serverError = 500;
var statusSuccess = 200;
var statusAdded = 201;

var userSchema = mongoose.Schema({
    username: String,
    name: String,
    password: String,
    email: String,
    type: String,
    department: String
});

var User = mongoose.model("users", userSchema);

exports.getAllUsers = function (response) {
    User.find(function (error, users) {
        if (error) {
            response.status(serverError);
            response.json(error);
        }
        response.status(statusSuccess);
        response.json(users);
    });
};

exports.getUser = function (userId, response) {
    User.find({username: userId}, function (error, user) {
        if (error) {
            response.status(serverError);
            response.json(error);
        }
        response.status(statusSuccess);
        response.json(user[0]);
    });
};

exports.removeUser = function (userId, response) {
    User.remove({username: userId}, function (error) {
        if (error) {
            response.status(serverError);
            response.json(error);
        }
        response.status(statusSuccess);
        response.end();
    });
};

exports.addUser = function (newUser, response) {
    var addingUser = new User(newUser);
    addingUser.save(newUser, function (error, user) {
        if (error) {
            response.status(serverError);
            response.json(error);
        }
        response.status(statusAdded);
        response.json(newUser);
    });
};

exports.updateUser = function (userId, newUserBody, response) {
    console.log(newUserBody);
    User.update(userId, {$set: newUserBody}, function (error, user) {
        if (error) {
            response.status(500);
            response.json(error);
        }
        response.status(statusSuccess);
        response.json(user);
    });
};