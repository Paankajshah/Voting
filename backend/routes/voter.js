const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const { Voter , validate} = require("../models/voters");

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



module.exports = router;
