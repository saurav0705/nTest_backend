const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');


const user = new Schema({
    
    name:{
        type:String,
    },
    answers : [ {
        type : mongoose.Schema.Types.ObjectId,
       ref :'Answer'
    } ],
    questions : [ {
        type : mongoose.Schema.Types.ObjectId,
       ref :'Question'
    } ],

},{
    timestamps:true
});
user.plugin(passportLocalMongoose);
const User = mongoose.model('User',user);
module.exports = User;