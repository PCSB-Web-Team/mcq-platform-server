const Participant = require("../models/participant.model");

async function attemptQuestion(req,res){
    const{questionId,attempted,userId,contestId}=req.body;
    try {
        filter={$and:[{userId:userId},{contestId:contestId}],"questions.questionId":questionId}
        update={"$set":{"questions.$.attempted":attempted}}
        const updateAttempted=await Participant.updateOne(
            filter,update
        )
        res.send({msg:"updated attempted question"});
    } catch (error) {
        res.status(400).send(err.message);
    }
}

module.exports={attemptQuestion}