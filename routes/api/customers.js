const express = require('express');
const router = express.Router();
const Customer = require("../../models/customer.model")

router.route('/').get(function(req,res){
        Customer.find((err,customers) => {
        if(err) {
            console.log(err);
          }  else {
            res.json(customers)
        }
        })
    });
 
  router.route('/:id').get(function(req,res) {
      let id = req.params.id;
      Customer.findById(id, function(err,customer) {
        if(err) {
            console.log(err)
        } else {
            res.json(customer)
        }
      });
  });


  router.route('/add').post(function(req,res) {
    let customer = new Customer(req.body);
    console.log(req.body);
   customer.save()
   .then(customer => {
       res.status(200).json(customer);
   })
   .catch(err => {
       res.status(400).send('can not add customer');
   })
})
  

  router.route('/update/:id').post(function(req,res) {
      Customer.findById(req.params.id, function(err,customer) {
        if(!customer) {
            res.status(404).send('data not found')
        } else {
          customer.customer_date= req.body.customer_date
          customer.customer_customer= req.body.customer_customer
          customer.customer_channel= req.body.customer_channel
          customer.customer_description= req.body.customer_description
          customer.customer_operation= req.body.customer_operation
          customer.customer_status= req.body.customer_status
          customer.customer_updates= req.body.customer_updates
          customer.customers_result= req.body.customer_result
          customer.customer_total= req.body.customer_total
          customer.customer_account= req.body.customer_account
          customer.customer_priority= req.body.customer_priority
          customer.customer_followup= req.body.customer_followup
          customer.customer_website= req.body.customer_website
  
          customer.save()
          .then(customer => {
              res.json('Customer info Updated!')
          })
          .catch(err => {
              res.status(400).send('Update not possible')
          });
      }
      });
  });
  
  router.route('/delete/:id').post(function(req,res) {
      
      let id = req.params.id
      Customer.findByIdAndRemove(id, function(err, customer) {
          if(err) res.json(err);
          else res.status(200).json(req.params.id);
      });
  });

  module.exports = router;