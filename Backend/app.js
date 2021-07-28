const express=require('express')
const mongoose=require('mongoose')
const {MONGOURI}=require('./keys')
const interviewrouter=require('./routes/interview')
const userrouter=require('./routes/user')

// const cors=require('cors')
// require('dotenv').config();

const app=express();

const port=process.env.PORT ||5000;
app.use(express.json())

mongoose.connect(MONGOURI,{useNewUrlParser:true,useCreateIndex:true, useUnifiedTopology: true })
mongoose.connection.on('connected',()=>{
    console.log("Mongodb database connection established successfully")
})
mongoose.connection.on('error',(err)=>{
    console.log("Getting error in connection to MongoDB",err)
})

app.use('/interview',interviewrouter)
app.use('/user', userrouter)

app.listen(port,()=>{
    console.log("Server is running");
})