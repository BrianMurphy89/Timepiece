const express = require('express')
const router = express.Router();
const user = require('../models/watch-schema.js')
const bcrypt = require('bcrypt');

router.get('/session', (req,res) => {
    if(req.session.currentuser){
        res.json(req.session.currentuser)
    } else {
        res.status(401).json({
            status:401,
            message:'You are not logged in!'
        })
    }
})

router.post('/login', (req,res) => {
    user.findOne({username:req.body.username}, (err, foundUser) => {
        if(bcrypt.compareSync(req.body.password, foundUser.pasword)){
            res.session.currentuser = foundUser
            res.json(req.session.currentuser)
        } else {
            res.status(401).json({
                status:401,
                message:'Login failed. Try again!'
            })
        }
    })
})

router.delete('/end-session', (req,res) => {
    req.session.destroy(() => {
        res.status(200).json({
            status:200,
            message:'Logout Successful'
        })
    })
})

module.exports = router;
