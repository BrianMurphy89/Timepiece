const express = require('express');
const mongoose = require('mongoose');
const watch = require('../models/watch-schema.js');
const router = express.Router();


//Index Route
router.get('/', (req,res) => {
    watch.find({}, (err,foundWatch) => {
        console.log(foundWatch);
        res.json(foundWatch)
    })
})

//Create Route
router.post('/', (req,res) => {
    watch.create(req.body, (err,createdWatch) => {
        console.log(createdWatch);
        res.json(createdWatch)
    })
})

//Delete Route
router.delete('/:id', (req,res) => {
    watch.findByIdAndRemove(req.params.id, (err, deleteWatch) => {
        res.json(deleteWatch)
    })
})

//Edit Route
router.put('/:id', (req,res) => {
    watch.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err,updatedWatch) => {
        console.log(updatedWatch);
        res.json(updatedWatch)
    })
})

//Show Route
router.get('/:id', (req,res) => {
    watch.findById(req.params.id, (err,foundWatch) => {
        res.json(foundWatch)
    })
})

module.exports = router;
