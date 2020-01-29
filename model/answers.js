const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const answer = new Schema({
    
    answer:{
        type:String,
        required: true
    },
    
    question :  {
        type : mongoose.Schema.Types.ObjectId,
       ref :'Question',
       required: true
    },


    author :  {
        type : mongoose.Schema.Types.ObjectId,
       ref :'User',
       required: true
    },


    upvote : [{
        type : mongoose.Schema.Types.ObjectId,
       ref :'User'
    }],



    downvote : [{
        type : mongoose.Schema.Types.ObjectId,
       ref :'User'
    }]

},{
    timestamps:true
});

const Answer = mongoose.model('Answer',answer);
module.exports = Answer;