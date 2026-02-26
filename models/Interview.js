const mongoose = require('mongoose');

const InterviewSchema = new mongoose.Schema({
    sessionDate:{
        type: Date,
        required:[true,'Please add interview date'],
        validate: {
            validator: function(value) {    
            const startDate = new Date('2022-05-10');
            const endDate = new Date('2022-05-13');

            return value >= startDate && value <= endDate;
            },
            message: 'Interview date must be between May 10-13, 2022'
        }
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