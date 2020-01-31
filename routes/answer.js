var express = require('express');
var Users = require('../model/users');
var Questions = require('../model/question');
var Answers = require('../model/answers');
const bodyParser = require('body-parser');
var passport = require('passport');
var authenticate = require('../authenticate');

const ansRouter = express.Router();
ansRouter.use(bodyParser.json());

const find = (list,obj) =>{
    for(let i=0;i<list.length;i++)
    {
        
        if (obj.toString() == list[i])
        {
            return true;
        }
    }
    return false;
};


ansRouter.route('/:ansId/upvote')
.all(authenticate.verifyUser,(req,res,next)=>{
    res.statusCode=200;
    res.setHeader('Content-type','application/json');
    next();
})
.get((req,res,next)=>{
    Answers.findById(req.params.ansId)
    .then((answer)=>{
        if(find(answer.downvote,req.user._id))
        {
            let UpdatedDownVoteList = [];
            for(let i=0;i<answer.downvote.length;i++)
            {
                if(answer.downvote[i] != (req.user._id).toString())
                {
                    UpdatedDownVoteList.push(answer.downvote[i]);
                }
            }

            answer.downvote = UpdatedDownVoteList;
        }

        // var upvoteList = answer.upvote.push(req.user._id);
        // var upvoteSet = new Set(upvoteList);
        // answer.upvote= upvoteSet;
        if(!find(answer.upvote,req.user._id))
        {answer.upvote.push(req.user._id);}
        answer.save()
        .then((answer)=>{
            res.json({"answer":answer})
        })
        
    },(err)=>next(err))
    .catch((err)=>next(err));
});



ansRouter.route('/:ansId/downvote')
.all(authenticate.verifyUser,(req,res,next)=>{
    res.statusCode=200;
    res.setHeader('Content-type','application/json');
    next();
})
.get((req,res,next)=>{
    Answers.findById(req.params.ansId)
    .then((answer)=>{
        if(find(answer.upvote,req.user._id))
        {
            
            let UpdatedupVoteList = [];
            for(let i=0;i<answer.upvote.length;i++)
            {   
                if(answer.upvote[i] != (req.user._id).toString())
                {
                    
                    UpdatedupVoteList.push(answer.upvote[i]);
                }
            }

            answer.upvote = UpdatedupVoteList;
        }

        // var downvoteList = answer.downvote.push(req.user._id);
        // var downvoteSet = new Set(downvoteList);
        // answer.downvote= downvoteSet;
        if(!find(answer.downvote,req.user._id))
        {answer.downvote.push(req.user._id);}
        answer.save()
        .then((answer)=>{
            res.json({"answer":answer})
        })
        
    },(err)=>next(err))
    .catch((err)=>next(err));
});


module.exports = ansRouter;
