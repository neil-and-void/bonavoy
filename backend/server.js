const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, './.env') })
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const passport = require("passport");
// const passportLocal = require("passport-local").Strategy;
const cookieParser = require("cookie-parser");
const WebSocket = require('ws');
const bcrypt = require("bcryptjs");
const session = require("express-session");
const bodyParser = require("body-parser");
const app = express();
const User = require("./models/User.model");
//----------------------------------------- END OF IMPORTS---------------------------------------------------

// setup websocket
const wss = new WebSocket.Server({port:8000}, () => {
  console.log('WebSocket created');
});

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
  });

  ws.send('connected');
});

wss.on('close', function close() {
  console.log('closed connection');
});

mongoose.connect(
  process.env.DB_MONG,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }, () => {
    console.log("Mongoose Is Connected");
  }
);

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000", // <-- location of the react app were connecting to
    credentials: true,
  })
);
app.use(
  session({
    secret: "secretcode",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(cookieParser("secretcode"));
app.use(passport.initialize());
app.use(passport.session());
require("./config/passport.config")(passport);



app.use('/api', require('./routes/app.routes')); 
app.use('/api/external', require('./routes/external.routes')); 

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log("Server is running on Port: " + PORT);
});