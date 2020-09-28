const express = require("express");
const router = express.Router();
const { candAccountSchema , validate } = require("../models/candAccount");
const { User } = require("../models/users");
const { Candidate } = require("../models/candidate");
var generatePassword = require("password-generator");
const bcrypt = require("bcrypt");

router.get("/candaccounts", async (req, res) => {
  const cand = await candAccountSchema
    .find()
    
  res.send(cand);
});

router.post("/candaccount", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(200).send(error.details[0].message);
  let data = await Candidate.findById(req.body.id);
  var str = data.email;
  const index = str.indexOf("@");
  const string = str.slice(0, index);
  const a = Math.floor(Math.random() * 100000).toString();
  const final = string.concat(a);
  const password = generatePassword(8);
  let passOriginal = password;
  bcrypt.hash(password, 10, async (err, hash) => {
  
  let user = new User({
    name: data.name,
    username: final,
    email: data.email,
    password: hash,
  });
  user = await user.save();

  console.log("user", user);
});

  let postCand = new candAccountSchema({
    citizenship:req.body.citizenship,
    account: req.body.account,
    details: {
      name: data.name,
      email: data.email,
      citizenship: data.citizenship,
      party:data.party,
  }
  });
  postCand = await postCand.save();
  const finalData = {
    username: final,
    account: postCand.account,
    name: data.name,
    email: data.email,
    password:password,
  };
 
  res.send(finalData);
});

router.post("/onecandidate", async (req, res) => {
  const candidate = await candAccountSchema
    .findOne({
        citizenship: req.body.citizenship,
    
    })
    console.log(candidate)
    
  res.send(candidate);
});


module.exports = router;
