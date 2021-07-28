const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
let Interview=require('../models/interview')


//all upcoming interviews
router.get('/upcoming',(req,res)=>{
    
   Interview.find()
   .populate("participants","_id email")
   .then((allInterviews)=>{
    res.json({allInterviews})
   })
   .catch(err=>console.log(err))
})

//create an interview
router.post('/create',(req,res)=>{
    const {startTime,endTime,participants} = req.body;
    
  if (!startTime || !endTime || participants.length<2)
    return res.json({ error: "Please add all the fields or participants should be greater than 1" });
  else {
    
      let c=-1;
      Interview.find()
               .then(interviews=>{
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
                                    if(p1[i] == p2[j])
                                    {
                                        c=0;
                                        console.log("a")
                                        
                                        break;
                                    }
                                }
                            }
                            if(c==0)
                            {
                                res.json({ error: "Some participants is scheduled in another interview at this time." });
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
                                             console.log("save")
                                           return  res.json({ message: "Interview scheduled successfully" });
                                         })
                                         .catch((err) => console.log(err));
                            }
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
                                         console.log("save")
                                        return res.json({ message: "Interview scheduled successfully" });
                                     })
                                     .catch((err) => console.log(err));
                        }
                    }))
               })

               
               
    
  }
})

//edit interview
router.post('/edit',(req,res)=>{
    const {id,startTime,endTime,participants} = req.body;
    if (!startTime || !endTime || participants.length<2)
    return res.json({ error: "Please add all the fields" });
  else {
    
      let c=-1;
      Interview.find()
               .then(interviews=>{
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
                                    if(p1[i] == p2[j])
                                    {
                                        c=0;
                                        console.log("a")       
                                        break;
                                    }
                                }
                            }
                            if(c==0)
                            {
                                res.json({ error: "Some participants is scheduled in another interview at this time." });
                            }
                            else
                            {
                                Interview.findByIdAndUpdate(id,{startTime:startTime,endTime:endTime},function(err,interview){
                                    if(err)
                                    console.log(err);
                                    else
                                    console.log(interview)
                                })
                            }
                        }
                        else
                        {
                            Interview.findByIdAndUpdate(id,{startTime:startTime,endTime:endTime},function(err,interview){
                                if(err)
                                console.log(err);
                                else
                                console.log(interview)
                            })
                            
                        }
                    }))
               })

  }   
               
   
             
             
        
})

module.exports=router