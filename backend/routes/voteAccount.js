const express = require('express')
const router = express.Router();
const { voteAccountSchema } = require("../models/votAccount")

router.get("/voteaccounts" , async(req, res ) =>{
    const vote = await voteAccountSchema.find().select('account details').populate('details', 'name email');
    res.send(vote);
})

router.post("/voteaccount" , async(req , res ) =>{
    let postVote = new voteAccountSchema({
        account : req.body.account,
        details:req.body.id
    });
    postVote = await postVote.save();
    res.send(postVote);
})

module.exports = router
