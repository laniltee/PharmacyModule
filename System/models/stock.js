/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/pharmacy");

var stockSchema = mongoose.Schema({
    stockId: String,
    name: String,
    category: String,
    unit: String,
    total: Number,
    reorderingLevel: Number,
    warningLevel: Number,
    comments: String,
    containers: {
        levelOne: {
            name: String,
            units: Number
        },
        levelTwo: {
            name: String,
            units: Number
        },
        levelThree: {
            name: String,
            units: Number
        }
    },
    batches: [
        {
            id: String,
            receivedDate: Date,
            expiryDate: Date,
            manufacturedDate: Date,
            buyingAt: Number,
            sellingAt: Number,
            items: {
                levelOne: Number,
                levelTwo: Number,
                levelThree: Number
            },
            supplier: {
                name: String,
                email: String,
                contactNo: String
            }
        }
    ],
    orders: [
        {
            id: String,
            orderDate: Date,
            quantities: {
                levelOne: Number,
                levelTwo: Number,
                levelThree: Number
            },
            orderedBy: String,
            isReceived: Boolean
        }
    ],
    requests: [
        {
            id: String,
            reqDate: Date,
            quantities: {
                levelOne: Number,
                levelTwo: Number,
                levelThree: Number
            },
            requestedBy: String,
            isAccepted: String,
            acceptedRejectedBy: String
        }
    ]
});

var stock = mongoose.model("stock", stockSchema);