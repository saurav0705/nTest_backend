var express = require('express');
var Users = require('../model/users');
var Questions = require('../model/question');
var Answers = require('../model/answers');
const bodyParser = require('body-parser');
var passport = require('passport');
var authenticate = require('../authenticate');


const quesRouter = express.Router();
quesRouter.use(bodyParser.json());
quesRouter.route('/')
.all((req,res,next)=>{
    res.statusCode=200;
    res.setHeader('Content-type','application/json');
    next();
})
.get((req,res,next)=>{
    Questions.find({})
    .deepPopulate('answers author answers.author')
    .then((questions)=>{
        res.json({'questionList': questions});
    },(err)=>(next(err)))
    .catch((err)=>(next(err)));
})
.post(authenticate.verifyUser,(req,res,next)=>{
    Questions.create({'author': req.user._id,'question': req.body.question})
    .then((question)=>{
        res.json({"status":"ok","question":question});
    },(err)=> next(err))
    .catch((err)=>next(err))
});

quesRouter.route('/:questionId')
.all((req,res,next)=>{
    res.statusCode= 200;
    res.setHeader('Content-type','application/json');
    next();
})
.get((req,res,next)=>{
    Questions.findById(req.params.questionId)
    .then((question)=>
    {
        res.json({"question":question})
    },(err)=>next(err))
    .catch((err)=>next(err));
});

quesRouter.route('/:questionId/answer')
.all((req,res,next)=>{
    res.statusCode=200;
    res.setHeader('Content-type','application/json');
    next();
})
.get((req,res,next)=>{
    Questions.findById(req.params.questionId)
    .deepPopulate('answers.author')
    .then((question)=>{
        res.json({"answer":question.answers});
    },(err)=>next(err))
    .catch((err)=>next(err));
})
.post(authenticate.verifyUser,(req,res,next)=>{
    Questions.findById(req.params.questionId)
    .then((question)=>{
        Answers.create({"answer":req.body.answer,"author":req.user._id,"question":req.params.questionId})
        .then((answer)=>{
            question.answers.push(answer);
            question.save()
            .then((question)=>{
                res.json({"status":"ok","question":question});
            })
            
        })
    },(err)=>next(err))
    .catch((err)=>next(err));
});

quesRouter.route('/search')
.all((req,res,next)=>{
    res.statusCode=200;
    res.setHeader('Content-type','application/json');
    next();
})
.post((req,res,next)=>{
    Questions.find({$text: {$search: req.body.search}})
    .limit(10)
    .deepPopulate('answers author answers.author')
    .then((questions)=>{
        res.json({'questionList': questions});
    },(err)=>(next(err)))
    .catch((err)=>(next(err)));
})

module.exports = quesRouter;