const mongoose = require('mongoose');
const EmailData = require('../models/Email');
const express = require('express');
const router = express.Router();
const {emailOfCategory} = require('./functions/emailFunction');

//GET ALL THE EMAILS STORED INSIDE THE LIST
router.get('/all', async(req, res) => {
    EmailData.find({}, async(err, ans) => {
        if(err)
        {   
            console.log(err);
            return res.status(500).send("Error = " + err);
        }
        let emails = [];
        await ans.forEach(async(email) => {
            emails.push(email.email);
        });
        return res.status(200).send(emails);
    });
});

//STORE A NEW EMAIL IN THE LIST
router.post('/new', async(req, res) => {
    const {email, category} = req.body;
    EmailData.findOne({email:email}, async(err, found)=>{
        if(found)   
            return res.send("This email already exists.");
        else
        {
            const newEmail = await new EmailData({
                email:email,
                category:category
            });
            await newEmail.save();
            return res.status(200).json({
                status:200,
                message:"Email has been added to the list."
            });
        }
    });
    
});

//GET ALL DETAILS OF A PARTICULAR EMAIL
router.post('/details', async(req, res)=> {
    const {email} = req.body;
    EmailData.findOne({email:email}, async(err,found) => {
        if(err)
        {
            return res.status(500).send(err);
        }
        else
        {
            if(found){
                return res.status(200).send(found);
            }
            else{
                return res.status(404).send("No such email found in the list.");
            }
        }
    });
});

//GET ALL EMAILS OF A PARTICULAR CATEGORY - BUSINESS, ENGINEERING, ETC.
router.post('/category/all', async(req, res, next) => {
    const {category} = req.body;
    emailOfCategory(category, function(result) {
        return res.send(result);
      });
});


router.get('/unsubscribe', async(req, res)=>{

});

module.exports = router;