const express = require('express')
const router = express.Router();
const { voteAccountSchema } = require("../models/voteAccount")
const { Voter, validate } = require("../models/voters");

router.get("/voteaccounts" , async(req, res ) =>{
    const vote = await voteAccountSchema
        .find()
        .select('account details')
        .populate('details', 'name email');
    res.send(vote);
})

router.post("/voteaccount" , async(req , res ) =>{
   const { error } = validate(req.body);
   if (error) return res.status(200).send(error.details[0].message);
   let data = await Voter.findById(req.body.id);
   var str = data.email;
   const index = str.indexOf("@");
   const string = str.slice(0, index);
   const a = Math.floor(Math.random() * 100000).toString();
   const final = string.concat(a);

  let postVoter = new voteAccountSchema({
     citizenship:data.citizenship,
     account: req.body.account,
     details: {
       name: data.name,
       email: data.email,
       citizenship: data.citizenship,
     },
   });
   postVoter = await postVoter.save();
   const finalData = {
     username: final,
     account: postVoter.account,
     name: data.name,
     email: data.email,
   };

   res.send(finalData);
})

router.post("/onevoter", async (req, res) => {
  const voter = await voteAccountSchema
    .findOne({
      citizenship: req.body.citizenship,
    })

  res.send(voter);
});


module.exports = router
