/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var mongoose = require('mongoose');
mongoose.connect("localhost/pharmacy");

var patientSchema = mongoose.Schema({
    patientId: String,
    name: String,
    prescriptions: [
        {
            id: String,
            doctor: String,
            originalDate: Date,
            drugs: [
                {
                    id: String,
                    name: String,
                    dose: String,
                    frequency: String,
                    unitPrice: Number,
                    units: Number,
                    total: Number
                }
            ],
            openings: [
                {
                    date: Date,
                    isOpened: Boolean,
                    openedBy: String
                }
            ],
            prescriptionTotal: Number
        }
    ]
});

var patients = mongoose.model("patients", patientSchema);


