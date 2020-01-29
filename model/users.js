const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');


const user = new Schema({
    
    name:{
        type:String,
    },
    answers : [ {
        type : mongoose.Schema.Types.ObjectId,
       ref :''
    } ],
    questions : [ {
        type : mongoose.Schema.Types.ObjectId,
       ref :''
    } ],

},{
    timestamps:true
});
user.plugin(passportLocalMongoose);
const User = mongoose.model('User',user);
module.exports = User;