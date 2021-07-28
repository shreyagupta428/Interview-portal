const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
let User=require('../models/user')

//create a user
router.post('/create',(req,res)=>{
    console.log(req.body.name);
    const { name, email, phone, isAdmin} = req.body;
  if (!email || !phone || !name)
    return res.json({ error: "Please add all the fields" });
  else {
    User.findOne({ email: email })
      .then((savedUser) => {
        if (savedUser)
          return res.json({ error: "User already exits with that email" });
        else {
          
            const user = new User({
              email: email,
              name: name,
              isAdmin: isAdmin,
              phone: phone
            });

            user
              .save()
              .then((user) => {
                res.json({ message: "saved successfully" });
              })
              .catch((err) => console.log(err));
          
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
})

router.get('/all',(req,res)=>{
    User.find({isAdmin:"false"})
    .populate("user","_id email")
    .then(allUsers=>{
        console.log(allUsers)
        res.json({allUsers})
    })
    .catch(err=>console.log(err))

})



module.exports=router