const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let CustomerSchema = new Schema({
    customer_date: {
        type: Date
    },
    customer_customer: {
        type:String
    },
    customer_channel: {
        type: String
    },
    customer_description: {
        type:String
    },
    customer_operation: {
        type:String
    },
    customer_status: {
        type:String
    },
    customer_updates: {
        type:String
    },
    customers_result: {
        type:String
    },
    customer_total: {
        type:String
    },
    customer_account: {
        type:String
    },
    customer_priority: {
        type:String
    },
    customer_followup: {
        type:String
    },
    customer_website: {
        type:String
    }
    
})

exports.CustomerSchema = CustomerSchema;

module.exports = mongoose.model('Customer', CustomerSchema);
            
            
    