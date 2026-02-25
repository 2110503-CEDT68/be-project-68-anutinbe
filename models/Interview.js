const mongoose = require('mongoose');

const InterviewSchema = new mongoose.Schema({
    sessionDate:{
        type: Date,
        required:true
    },
    user:{
        type:mongoose.Schema.ObjectId,
        ref:'User',
        required:true
    },
    company:{
        type:mongoose.Schema.ObjectId,
        ref:'Company',
        required:true
    },
});


module.exports = mongoose.model('Interview',InterviewSchema);