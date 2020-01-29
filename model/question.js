const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var deepPopulate = require('mongoose-deep-populate')(mongoose);


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

question.plugin(deepPopulate);
const Question = mongoose.model('Question',question);
module.exports = Question;