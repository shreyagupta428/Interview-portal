const mongoose = require("mongoose");
const User=require('./user')

const interviewSchema = new mongoose.Schema({
    startTime: {
        type:Date,
        required:true
    },
    endTime: {
        type:Date,
        required:true
    },
    participants:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:User,
        required:true    
    }]
});

const Interview = mongoose.model("Interview", interviewSchema);
module.exports = Interview;
