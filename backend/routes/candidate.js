const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const { Candidate, validate, CandidateFinal } = require("../models/candidate");

router.get("/candidates", async (req, res) => {
  const candidate = await Candidate.find();
  res.send(candidate);
});

router.post("/candidate", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(200).send(error.details[0].message);

  let postCandidate = new Candidate({
    name: req.body.name,
    email: req.body.email,
    citizenship: req.body.citizenship,
    party: req.body.party,
  });

  postCandidate = await postCandidate.save();
  res.send(postCandidate);
});

router.get("/candidate/:id", async (req, res) => {
  const candidate = await Candidate.findById(req.params.id);

  if (!candidate) return res.status(404).send("Candidate not found");

  res.send(candidate);
});

router.post("/candidatemove", async (req, res) => {
  const candidate = await Candidate.findOne({ _id: req.body.id });

  let postCandidate = new CandidateFinal({
    name: candidate.name,
    email: candidate.email,
    citizenship: candidate.citizenship,
    party: candidate.party,
  });
  candidate.remove();
  await postCandidate.save();
  res.send(postCandidate);
});
router.get("/finalCandidates", async (req, res) => {
  const candidate = await CandidateFinal.find();
  res.send(candidate);
});

module.exports = router;
