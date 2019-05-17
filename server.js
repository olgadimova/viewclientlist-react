const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const PORT = process.env.PORT || 8000;
const app = express();
const passport = require("passport");

const users = require("./routes/api/users");
const router = require("./routes/api/customers")
require('dotenv').config()

// ... other imports 
const path = require("path")

//DB Connection 
const db = process.env.MONGODB_URI;
mongoose.connect(db, {useNewUrlParser: true})
    .then(() => console.log("MongoDB connected..."))
    .catch(err => console.log(err));


// Middleware
app.use(helmet());
app.use(cors());
app.use(bodyParser.urlencoded(
    {extended: false}
))
app.use(bodyParser.json());

//Passport initialization

app.use(passport.initialize());

// Passport Config


require('./config/passport')(passport);


// Passport Routes

app.use('/api/users', users);

app.use('/customers', router);

// ... other app.use middleware 
app.use(express.static(path.join(__dirname, "client", "build")))

// Right before your app.listen(), add this:
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(PORT, function(){
    console.log("Listening to Port" + PORT);
});

