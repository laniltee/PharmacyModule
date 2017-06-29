var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/university');

var students = mongoose.model('students', {sId: String, name: String, dept: String});

exports.getAllStudents = function(res){
	console.log("getAllStudents [FUNCTION CALLED]");
	students.find(function(error, students){
		if(error){
			res.status(500).end();
		}
		res.json(students);
	});
};

exports.addNewStudent = function(newStudent, res){
	console.log("addNewStudent [FUNCTION CALLED]");
	var addedStudent = new students(newStudent);
	addedStudent.save(function(error, addedStudent2){
		if(error){
			res.status(500).end();
		}
		res.status(201).json(addedStudent2);
	});
};