const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const { Candidate , validate} = require("../models/candidate");

router.get("/candidates", async (req, res) => {
  const candidate = await Candidate.find();
  res.send(candidate);
});

router.post("/candidate", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let postCandidate = new Candidate({
    name: req.body.name,
    email: req.body.email,
  });

  postCandidate = await postCandidate.save();
  res.send(postCandidate);
});

router.get("/candidate/:id", async (req, res) => {
  const candidate = await Candidate.findById(req.params.id);

  if (!candidate)
    return res.status(404).send("Candidate not found");

  res.send(candidate);
});



module.exports = router;
