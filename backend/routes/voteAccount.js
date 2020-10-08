const express = require('express')
const router = express.Router();
const { voteAccountSchema , validate } = require("../models/voteAccount")
const { Voter } = require("../models/voters");
var generatePassword = require("password-generator");
const bcrypt = require("bcrypt");
const { User } = require("../models/users");
const nodemailer = require("nodemailer");

router.get("/voteaccounts" , async(req, res ) =>{
    const vote = await voteAccountSchema
        .find()
        .select('account details')
        .populate('details', 'name email');
    res.send(vote);
})

router.post("/voteaccount", async (req, res) => {
   let transporter = nodemailer.createTransport({
     service: "gmail",
     auth: {
       user: "vascode7@gmail.com",
       pass: "punkaj9411",
     },
   });
   const { error } = validate(req.body);
   if (error) return res.status(200).send(error.details[0].message);
   let data = await Voter.findById(req.body.id);
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

  let postVoter = new voteAccountSchema({
     citizenship:data.citizenship,
     account: req.body.account,
     details: {
       name: data.name,
       email: data.email,
       citizenship: data.citizenship,
     },
   });
   console.log("beforevoter" , postVoter)
  postVoter = await postVoter.save();
  console.log("aftervoter" , postVoter)
   const finalData = {
     username: final,
     account: postVoter.account,
     name: data.name,
     email: data.email,
     password: password,
  };
   await transporter.sendMail({
     from: "'Voting' <vascode7@gmail.com>", // sender address
     to: data.email, // list of receivers
     subject: "Credentials", // Subject line
     html: `<div>
   <div style="text-align:center;">
<h1 style="color:blue;"> Hi!! ${data.name}</h1>

</div>
<p>Hera are your credentials</p>
<p><b>Account Address:</b> ${postVoter.account} </p>
<p><b>Your Key:</b> ${req.body.key} </p>
<p><b>Your Email:</b> ${data.email} </p>
<p><b>Your Password:</b> ${password} </p>
</div>`, // html body
   });

console.log("finalData" , finalData)
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
