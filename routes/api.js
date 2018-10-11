const express = require("express");
const router = express.Router();
const Hill = require("../models/hill");

// get a list of hills from the db
router.get("/hills", function(req, res, next) {
  /*Hill.find({}).then(function(hills) {
    res.send(hills);
  });*/

  Hill.aggregate()
    .near({
      near: {
        type: "Point",
        coordinates: [parseFloat(req.query.lng), parseFloat(req.query.lat)]
      },
      maxDistance: 100000,
      spherical: true,
      distanceField: "dis"
    })
    .then(function(hills) {
      res.send(hills);
    })
    .catch(next);
});

// ad a new hill to the db
router.post("/hills", function(req, res, next) {
  /** var hill = new Hill(req.body);
   hill.save(); **/
  Hill.create(req.body)
    .then(function(hill) {
      res.send(hill);
    })
    .catch(next);
});

// update a hill in the db
router.put("/hills/:id", function(req, res, next) {
  Hill.findByIdAndUpdate({ _id: req.params.id }, req.body).then(function() {
    Hill.findOne({ _id: req.params.id }).then(function(hill) {
      res.send(hill);
    });
  });
});

// delete a hill from the db
router.delete("/hills/:id", function(req, res, next) {
  Hill.findByIdAndRemove({ _id: req.params.id }).then(function(hill) {
    res.send(hill);
  });
});

module.exports = router;
