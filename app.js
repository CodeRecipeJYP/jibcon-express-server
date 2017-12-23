/**
 * Created by jaeyoung on 8/22/17.
 */
'use strict';
const express = require("express");
const app = express();
const jsonParser = require("body-parser").json;
const logger = require("morgan");

const routes = require("./routes/routes");
const productinstances_routes = require("./routes/productinstances_routes");
const admin = require("./firebase/firebaseadmin");
const user = require("./models/user");


// console.log("process.env.PORT", process.env.PORT);
const port = process.env.PORT || 3000;

app.use(logger("dev"));
app.use(jsonParser());

const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/qa",
  {
    useMongoClient: true
    /* other options */
  }
);

const db = mongoose.connection;

db.on("error", function(err) {
  console.error("connection error:", err);
});

db.once("open", function() {
  console.log("db connection successful");
});

// You don't need to to memorize all of these, just know that you have to set these headers up only once.
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT,POST,DELETE");
    return res.status(200).json({});
  }
  next();
});

app.use(function (req, res, next) {
  let idToken = req.headers["authorization"];
  console.log("app.use/authorization", idToken);

  let onAnonymous = (req, res, next) => {
    console.log("app.use/", "onAnonymous");
    req.uid = user.ANONYMOUS_UID;

    next();
  };

  if (!idToken) {
    onAnonymous(req, res, next);
  } else {
    admin.auth().verifyIdToken(idToken)
      .then(function (decodedToken) {
        let uid = decodedToken.uid;
        console.log("app.use/", "uid=", uid);
        req.uid = uid;
        next();
      }).catch(function (error) {
      console.log("app.use/", "error=", error);
      onAnonymous(req, res, next);
    });
  }
});

app.use("/products", routes);
app.use("/product_instances", productinstances_routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  // console.log("Catch 404 function called??");
  let err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// Error Handler
app.use(function(err, req, res, next) {
  // console.log("Error Handler function called??");
  // 500 : internal server error
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message
    }
  })
});

app.listen(port, function() {
  console.log("express server is listening on port", port);
});