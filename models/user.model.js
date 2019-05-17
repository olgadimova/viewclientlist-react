const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let Customer = require('./customer.model')

const CustomerSchema = require('mongoose').model('Customer').schema;

const UserSchema = new Schema ({
name: {
    type: String,
    required: true
},
email: {
    type: String,
    unique: true,
    required: true
},
password: 
    {type: String,
    required: true
    },
date: {
    type: Date,
    default: Date.now
},
resetPasswordToken:{
    type: String,
},
resetPasswordExpires: {
    type: Date
},
customers: {
    type: [CustomerSchema], 
    
}
});

module.exports = mongoose.model("users", UserSchema);