const express = require('express')
const router = express.Router();
const { candAccountSchema } = require("../models/candAccount")

router.get("/candaccounts" , async(req, res ) =>{
    const cand = await candAccountSchema.find().select('account details').populate('details', 'name email');
    res.send(cand);
})

router.post("/candaccount" , async(req , res ) =>{
    let postCand = new candAccountSchema({
        account : req.body.account,
        details:req.body.id
    });
    postCand = await postCand.save();
    res.send(postCand);
})

module.exports = router
