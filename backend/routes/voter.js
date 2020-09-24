const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const { Voter , validate , VoterFinal} = require("../models/voters");
const { date } = require("joi");

router.get("/voters", async (req, res) => {
  const voter = await Voter.find();
  res.send(voter);
});

router.post("/voter", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let postVoter = new Voter({
    name: req.body.name,
    email: req.body.email,
    citizenship: req.body.citizenship,
  });

  postVoter = await postVoter.save();
  res.send(postVoter);
});



router.get("/voter/:id", async (req, res) => {
  const voter = await Voter.findById(req.params.id);

  if (!voter)
    return res.status(404).send("Voter not found");

  res.send(voter);
});

router.post("/votermove", async (req, res) => {
  const voter = await Voter.findOne({ _id: req.body.id });

  let postVoter = new VoterFinal({
    name: voter.name,
    email: voter.email,
    citizenship: voter.citizenship,
  });
  voter.remove();
  await postVoter.save();
  res.send(postVoter);
});
router.get("/finalvoter", async (req, res) => {
  const voter = await VoterFinal.find();
  res.send(voter);
});





module.exports = router;
