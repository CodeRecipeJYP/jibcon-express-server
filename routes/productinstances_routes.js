'use strict';
const router = require('express').Router();
const ProductInstance = require('../models/models').ProductInstance;

router.param("productInstanceId", function (req, res, next, id) {
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
  console.log("post/Authorization", req.headers["Authorization"]);
  console.log("post/Authorization", req.headers);
  console.log("post/body", req.body);
  let product = new ProductInstance(req.body);
  res.json("");
});

//GET /productInstances/:productInstanceId
router.get("/:productInstanceId", function(req, res) {
  res.json(req.product);
  // res.json({
  //   response: "You sent me a GET request for ID " + req.params.productInstanceId
  // });
});

module.exports = router;