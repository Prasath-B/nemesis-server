const express = require("express");
const mongoose = require("mongoose");
const bodyParser =require("body-parser")
const cors = require('cors');
const jwt  =require('jsonwebtoken');
const passport = require("passport");
const session = require("express-session");
const dotenv = require('dotenv').config()
const router = require('./routes/router.js')

const app = express();
const PORT = process.env.PORT || "5000";
app.use(cors());



app.use(bodyParser.urlencoded({limit:'50mb',extended:true}));
app.use(bodyParser.json({limit:'50mb'}));



app.use(router)

const DB_URI = `mongodb+srv://prasath:${process.env.MONGO_KEY}@cluster0.pynuy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

mongoose.connect(DB_URI,{
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(session({
    secret:'Thisismybuyandsellwebsite',
    resave:true,
    saveUninitialized:true,
}));

app.use(passport.initialize());

app.use(passport.session());



passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});




app.listen(PORT,()=>{
    console.log(`Server is running on Port ${PORT}`)
})
