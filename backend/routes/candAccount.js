const express = require("express");
const router = express.Router();
const { candAccountSchema } = require("../models/candAccount");
const { Candidate, validate } = require("../models/candidate");

router.get("/candaccounts", async (req, res) => {
  const cand = await candAccountSchema
    .find()
    .select("account details")
    .populate("details", "name email");
  res.send(cand);
});

router.post("/candaccount", async (req, res) => {
  let data = await Candidate.findById(req.body.id);
  var str = data.email;
  const index = str.indexOf("@");
  const string = str.slice(0, index);
  const a = Math.floor(Math.random() * 100000).toString();
  const final = string.concat(a);


  let postCand = new candAccountSchema({
    account: req.body.account,
    details: req.body.id,
  });
  postCand = await postCand.save();
  const finalData = {
    username: final,
    account: postCand.account,
    name: data.name,
    email: data.email,
  };
 
  res.send(finalData);
});

module.exports = router;
