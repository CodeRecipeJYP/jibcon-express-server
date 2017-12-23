'use strict';
const router = require('express').Router();
const ProductInstance = require('../models/models').ProductInstance;
const admin = require("../firebase/firebaseadmin");


router.param("productInstanceId", function (req, res, next, id) {
  console.log("router.param/productInstanceId");
  ProductInstance.findById(id, function (err, doc) {
    if (err) return next(err);
    if (!doc) {
      err = new Error("Not Found");
      err.status = 404;
      return next(err);
    }

    req.product = doc;
    return next();
  })
});

// GET /productInstances
// Return all the productInstances
router.get("/", function(req, res) {
  // -1 means Descending Order
  // "null" is to use third parameter as projection.
  ProductInstance.find({})
    .sort({createdAt: -1})
    .exec(function (err, productInstances) {
      if (err) return next(err);
      res.json(productInstances);
    });
});

// POST /productInstances
router.post("/", function(req, res, next) {
  console.log("post/req.uid=", req.uid);
  console.log("post/body", req.body);

  res.json("");
});

//GET /productInstances/:productInstanceId
router.get("/:productInstanceId", function(req, res) {

  res.json(req.product);
});

module.exports = router;