const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const question = new Schema({
    
    question:{
        type:String,
        required: true
    },
    answers : [ {
        type : mongoose.Schema.Types.ObjectId,
       ref :'Answer'
    } ],
    author :  {
        type : mongoose.Schema.Types.ObjectId,
       ref :'User',
       required: true,
    } ,

},{
    timestamps:true
});

const Question = mongoose.model('Question',question);
module.exports = Question;