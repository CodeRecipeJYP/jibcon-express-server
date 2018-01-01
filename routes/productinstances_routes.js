'use strict';
const router = require('express').Router();
const ProductInstance = require('../models/productinstance').ProductInstance;
const fcm = require('../firebase/fcm');
const db = require('../firebase/db');

// POST /productInstances
router.post("/", function(req, res, next) {
  console.log("post/req.uid=", req.uid);
  console.log("post/body", req.body);

  let instance = new ProductInstance(req.body.uuid, req.body.fcmToken);
  db.createProductInstance(req.uid, req.body.name, instance)
    .then(() => {
      console.log("productinstances_routes.js/", "db.createProductInstance.then/", "instance=", instance);
      res.json(instance);
    });
});


// GET /productInstances
router.get("/", function(req, res, next) {
  console.log("get/body", req.body);

  fcm.sendToTestDevice()
    .then((response) => {
      res.json(response);
    }).catch((error) => {
      err.status = 500;
      err.message = error.message;
      next(err);
  });
});

router.post("/:instanceId", function(req, res, next) {
  // console.log("POST /:instanceId/", "req=", req, "body=", req.body);

  let onError = (error) => {
    err.status = 500;
    err.message = error.message;
    next(err);
  };

  db.findProductInstance(req.uid, req.params.instanceId)
    .then((productInstance) => {
      let token = productInstance.token;

      fcm.sendToDevice(token, req.body.action)
        .then((response) => {
          res.json(response);
        }).catch((error) => {
        onError(error);
      });
    }).catch((error) => {
      onError(error);
    }
  );
});

module.exports = router;