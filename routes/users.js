var express = require('express');
var Users = require('../model/users');
const bodyParser = require('body-parser');
var passport = require('passport');
var authenticate = require('../authenticate');


const userRouter = express.Router();
userRouter.use(bodyParser.json());
/* GET users listing. */
userRouter.route('/')
.all((req,res,next)=>{
  res.statusCode = 200;
  res.setHeader('Content-type','application/json');
  next();
})
.get((req,res,next)=>{
  
  res.json({
    'status': 'ok'
  });
})
.post((req,res,next) => {
  
});

userRouter.post('/signup',(req,res,next)=>{
  Users.register(new Users({username:req.body.username}) , req.body.password,(err,user)=>{
    if(err){
      res.statusCode = 400;
      res.setHeader('Content-type','application/json');
      res.json({"ERROR":err});
    }
    else{
      user.name = req.body.name;
      user.answered = [];
      user.questions = [];
      user.save()
      .then((user)=>{ 
       passport.authenticate('local')(req,res,()=>{
          res.statusCode = 200;
          res.setHeader('Content-type','application/json');
          res.json({success:true,status: "Registration Succesfull","USER":user});
        });
      },(err)=>next(err))
      .catch((err)=>next(err));
    }
  });
});

userRouter.post('/login',passport.authenticate('local'),(req,res)=>{
  var token = authenticate.getToken({_id:req.user._id});
  res.statusCode = 200;
  res.setHeader('Content-type','application/json');
  res.json({status:"You are succesfully logged In",success:true,token:token});
});

module.exports = userRouter;