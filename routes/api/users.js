const express = require('express');
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const async = require('async');
const nodemailer = require('nodemailer');
const crypto = require("crypto");

// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// Load User Model
const User = require("../../models/user.model");

// @route POST api/users/register
// @desc Register user
// @access Public
router.get("/", function(req,res) {
    User.find((err,users)  => {
        if(err) {
            console.log(err);
          }  else {
            res.json(users)
        }
        })
    });

    router.route('/:id').get(function(req,res) {
      let id = req.params.id;
      User.findById(id, function(err,user) {
        if(err) {
            console.log(err)
        } else {
            res.status(200).json(user)
        }
      });
    });


// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {

    // Form validation
const { errors, isValid } = validateLoginInput(req.body);

// Check valid-n
if(!isValid) {
    return res.status(400).json(errors);
}

const email = req.body.email;
const password = req.body.password;

// Find User By email
User.findOne({email}).then(user => {
    // Check if user exists
    if(!user) {
        return res.status(400).json({emailnotfound: "Email not found"});
    }

    //Check password
    bcrypt.compare(password, user.password).then(isMatch => {
        if(isMatch) {
            // User Match create JWT payload
            const payload = {
                id: user.id,
                name: user.name,
                
            };

            // Sign token
            jwt.sign(
                payload,
                keys.secretOrKey,
                {
                  expiresIn: 31556926 // 1 year in seconds
                },
                (err, token) => {
                  res.status(200).json({
                    success: true,
                    token: "Bearer" + token,
                    name: user.name,
                  });
                }
              );
            } else {
              return res
                .status(400)
                .json({ passwordincorrect: "Password incorrect" });
            }
          });
        });
      });

      // Forgot Password Routes +
      // Make route with crypto and async +
      // Make front-end component
      // Connect
      router.post("/forgot", (req, res,next) => {
      async.waterfall([
        function(done){
          crypto.randomBytes(20, function(err, buffer) {
            var token = buffer.toString('hex');
            done(err, token);
          });
        },
        function(token, done){
          User.findOne({email: req.body.email}).exec(function(err,user) {
            if(!user) {
              return res.status(400).json({notfound: "Email not found"});
            }
            user.resetPasswordToken = token;
            user.resetPasswordExpires = Date.now() + 3600000; // 1hour

            user.save(function(err) {
              done(err, token, user);
            });
          });
        },
        function(token,user,done) {
          var smtpTransport = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
              user: process.env.GMAIL,
              pass: process.env.GMAILPW
            }
          });
          var mailOptions = {
            to: user.email,
            from: process.env.GMAIL,
            subject: 'Node.js pass reset',
            text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
            'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
             req.headers.origin + '/api/users/reset/' + token + '\n\n' +
            'If you did not request this, please ignore this email and your password will remain unchanged.\n'
          };
          smtpTransport.sendMail(mailOptions, function(err) {
            console.log('mail sent');
            res.status(200).json({success:"An e-mail has been sent with futher instructions."});
            done(err, 'done');
          });
        }
      ], function(err) {
        if(err) return next(err);
      });
    });

    router.get('/reset/:token', function(req,res) {
      User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, 
      function(err, user) {
        if (!user) {
          res.status(400).json({expiredtoken: "Password reset token is invalid or has expired."});
        }
        res.status(200).json(user);
      });
    });
      
    router.post('/reset/:token', function(req, res) {
      async.waterfall([
        function(done) {
          User.findOne({ resetPasswordToken: req.body.token, resetPasswordExpires: { $gt: Date.now() } }, 
          function(err, user) {
            if (!user) {
              res.status(400).json({expiredtoken: "Password reset token is invalid or has expired."});
             console.log(req.body)
            }
            if(req.body.password === req.body.confirm) {
                
                user.resetPasswordToken = undefined;
                user.resetPasswordExpires = undefined;

                //Hashing Password
                bcrypt.genSalt(10, (err, salt) => {
                  bcrypt.hash(req.body.password, salt, (err,hash) => {
                      if(err) throw err;
                      user.password = hash;
                   user.save(function(err, user) {
                  done(err, user);
              })
            })
          })
            } else {
                res.status(400).json({nomatch: "Passwords do not match."});
            }
          });
        },
        function(user, done) {
          var smtpTransport = nodemailer.createTransport({
            service: 'Gmail', 
            auth: {
              user: process.env.GMAIL,
              pass: process.env.GMAILPW
            }
          });
          var mailOptions = {
            to: user.email,
            from: process.env.GMAIL,
            subject: 'Your password has been changed',
            text: 'Hello,\n\n' +
              'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
          };
          smtpTransport.sendMail(mailOptions, function(err) {
            res.status(200).json({successEmail: "Success! Your password has been changed."});
            done(err);
          });
        }
      ]);
    });

   
      module.exports = router;