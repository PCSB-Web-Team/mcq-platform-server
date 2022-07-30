const Participant = require("../models/participant.model");
const Contest=require("../models/contest.model");
const moment = require("moment");

async function createParticipant(req,res){
    const{userId,contestId}=req.body;
    //5d6ede6a0ba62570afcedd3a
    try {
        const createParticipant=await Participant.create({
            userId,
            contestId
        });
        return res.status(201).send(createParticipant);
    } catch (error) {
        return res.status(400).send(err.message);
    }
}

async function attemptQuestion(req,res){
    const{questionId,attempted,userId,contestId}=req.body;
    try {
        filter={$and:[{userId:userId},{contestId:contestId}],"questions.questionId":questionId}
        update={"$set":{"questions.$.attempted":attempted}}
        const updateAttempted=await Participant.updateOne(
            filter,update
        )
        return res.send({msg:"updated attempted question"});
    } catch (error) {
        return res.status(400).send(err.message);
    }
}

async function bookmarkQuestion(req,res){
    const{questionId,userId,contestId,bookmark}=req.body;
    try {
        filter={$and:[{userId:userId},{contestId:contestId}],"questions.questionId":questionId}
        update={"$set":{"questions.$.bookmark":bookmark}}
        const updateAttempted=await Participant.updateOne(
            filter,update
        )
        return res.status(200).send({msg:"bookmarked question"});
    } catch (error) {
        return res.status(400).send(err.message);
    }
}

async function clearQuestion(req,res){
    const{questionId,userId,contestId}=req.body;
    try {
        filter={$and:[{userId:userId},{contestId:contestId}],"questions.questionId":questionId};
        update={"$set":{"questions.$.attempted":null}};
        const updateAttempted=await Participant.updateOne(
            filter,update
        )
        return res.status(200).send({msg:"question selection cleared"});
    } catch (error) {
        return res.status(400).send(err.message);
    }
}

async function submitTest(req,res){
    const{userId,contestId}=req.body;
    try {
        const findContest = await Contest.findById(contestId);
        var startTime=moment(findContest.started);
        var now=moment(new Date());
        var timeTaken=moment.duration(startTime.diff(now));
        var timeTakenSeconds = timeTaken.asSeconds();

        filter={$and:[{userId:userId},{contestId:contestId}]};
        update={"timeTaken":timeTakenSeconds};
        const submitTest=await Participant.updateOne(
            filter,update
        )
        return res.status(200).send({msg:"Test Submitted!"});
    } catch (error) {
        return res.status(400).send(err.message);
    }
    
}

module.exports={attemptQuestion,createParticipant,bookmarkQuestion,clearQuestion,submitTest}