/**
 * Created by jaeyoung on 8/22/17.
 */
'use strict';
const router = require('express').Router();
const Product = require('../models/models').Product;

router.param("productId", function (req, res, next, id) {
  Product.findById(id, function (err, doc) {
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

// GET /products
// Return all the products
router.get("/", function(req, res) {
  // -1 means Descending Order
  // "null" is to use third parameter as projection.
  Product.find({})
    .sort({createdAt: -1})
    .exec(function (err, products) {
      if (err) return next(err);
      res.json(products);
    });
});

// POST /products
router.post("/", function(req, res, next) {
  let product = new Product(req.body);
  product.save(function (err, product) {
    if (err) return next(err);
    res.status(201);
    res.json(product);
  });
});

//GET /products/:productId
router.get("/:productId", function(req, res) {
  res.json(req.product);
  // res.json({
  //   response: "You sent me a GET request for ID " + req.params.productId
  // });
});

module.exports = router;