var express = require('express');

var router = express.Router();

var burgers = require('../models/burger.js');

router.get("/", function(req, res) {
    burgers.selectAll(function(data) {
        var handlebarsObject = {
            burgers: data
        };
    // console.log(handlebarsObject);
    res.render('index', handlebarsObject);
    });
});

router.post("/burgers", function(req, res) {
    burgers.insertOne([
        "burger_name"
    ], [
        req.body.burger_name
    ], function(data) {
       res.redirect("/");
    });
});

router.put("/burgers/:id", function(req, res) {
    var condition ="id = " + req.params.id;
    // console.log("condition", condition);

    burgers.updateOne({
        devoured: true
    }, condition, function(data) {
        if (result.changedRows == 0) {
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

module.exports = router;