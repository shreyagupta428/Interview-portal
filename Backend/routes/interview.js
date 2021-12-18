const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
let Interview=require('../models/interview')
let User=require('../models/user')
const nodemailer = require("nodemailer");

//all upcoming interviews
router.get('/upcoming',(req,res)=>{
 
    Interview.find({startTime: { $gte: Date.now() }})
   .populate("participants","_id email")
   .then(allInterviews=>{
    res.send({allInterviews})
   })
   .catch(err=>console.log(err))
})



//create an interview
router.post('/create',async(req,res)=>{
    const {startTime,endTime,participants} = req.body;
   
  if (!startTime || !endTime || participants.length<2)
    return res.json({ error: "Please add all the fields or participants should be greater than 1" });
  else {
     
      var c=false;
      const interviews=await Interview.find().exec()
      interviews.map((async interview=>{
                        
        var s = Date.parse(interview.startTime);
        var e= Date.parse(interview.endTime);
        var st=Date.parse(startTime);
        var et=Date.parse(endTime);
      

        if((e>st && s<=st) || (e>et &&  s<et) || (st<=s && et>=e ) )
        {
            
            var p1=interview.participants;
            var p2=participants;
            
            for(let i=0;i<p1.length;i++)
            {
                for(let j=0;j<p2.length;j++)
                {
                    if(p1[i]. toString() === p2[j]. toString())
                    {
                        c=true;
                        break;
                    }
                }
            }
            
        }
        
    }))
  

        if(c=== true)
        {
            
            return res.json({ error: "Some participants is scheduled in another interview at this time." });
        }
        else
        {
            const interview=new Interview({
                startTime:startTime,
                endTime:endTime,
                participants:participants
            })

            interview.save()
            .then((interview)=>{
            
            return  res.json({ message: "Interview scheduled successfully" });
            })
            .catch((err) => console.log(err));
        }

               
               
    
  }
})

//get interview by particular id
router.get('/:id',(req,res)=>{
    Interview.findById(req.params.id,function(err,interview){
        if(err)
        return res.json({ error: "Interview not found" });
        else
        return res.send(interview)
    })
})


//edit interview
router.put('/edit/:id',async (req,res)=>{
    const id=req.params.id;
    const {startTime,endTime,participants} = req.body;
    
    if (!startTime || !endTime || participants.length<2)
    return res.json({ error: "Please add all the fields or participants should be greater than 1" });
  else {
     
      var c=false;
      
      const interviews=await Interview.find().exec()

      interviews.map((async interview=>{
                         
        var s = Date.parse(interview.startTime);
        var e= Date.parse(interview.endTime);
        var st=Date.parse(startTime);
        var et=Date.parse(endTime);
       // console.log(e, s,st,et)

        if((e>st && s<=st) || (e>et &&  s<et) || (st<=s && et>=e ) )
        {
           // console.log(interview)
            var p1=interview.participants;
            var p2=participants;
            

            for(let i=0;i<p1.length;i++)
            {
                for(let j=0;j<p2.length;j++)
                {
                    if(p1[i]. toString() === p2[j]. toString())
                    {
                        c=true;
                      //  console.log("shreyaa")
                        
                        break;
                    }
                }
            }
            
        }
        
    }))
  

    if(c=== true)
    {
        
        return res.json({ error: "Some participants is scheduled in another interview at this time." });
    }
    else
    {
        const newinterview=await Interview.findByIdAndUpdate(id,{
            startTime:startTime,
            endTime:endTime,
            participants:participants
        },
        { new: true }
        ).exec();
        return res.json({message:"Successfully edited"})

        
    }
           
    
  }
     
       
})


//delete interview
router.delete('/delete/:id',(req,res)=>{
    //console.log(req.params.id);
    Interview.findByIdAndDelete(req.params.id,function (err, docs) {
        if (err){
            return res.json({ error: "Some technical error in deleting Interview" });
        }
        else{
        //    console.log("Deleted : ", docs);
            return res.json({ message: "Interview Sucessfully Deleted" });
        }})
})



//mail
router.get("/mail/:id",async (req,res)=>{
    const {id}=req.params;
    
    let participants=[];
   const interview= await Interview.findById(id).exec()
  // console.log("abccc" ,interview)
   
    participants=interview.participants;
    let allMails="";

   const p = await User.find({ '_id': { $in: participants } });
   p.map((async oneparti=>{
            allMails+=oneparti.email;
           //console.log("allMails ", allMails)
           allMails+=", ";
    }))

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: "shreyaguptaapril@gmail.com", // generated ethereal user
          pass: password, // generated ethereal password
        },
      });
    
      // send mail with defined transport object
      var mailOptions = {
        from: "shreyaguptaapril@gmail.com", // sender address
        to: allMails, // list of receivers
        subject: "From Interview-Creation-Portal", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hi, You have your interview schduled. Check out our website to know exact date and time of the interview.</b>", // html body
      }; 
     transporter.sendMail(mailOptions,function(err,info){
     if(err){
         console.log(err);
     }
     else
     {console.log("senttt");
     return res.json({ message: "Notification email sent successfully" });
    }
 })

            
    
})



module.exports=router
