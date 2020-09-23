const mongoose = require('mongoose')
const Joi = require("joi");

const Schema = mongoose.Schema

// Create Schema
const CandidateSchema = new Schema({
  name: {
    type: String
  },
  email: {
    type: String,
    required: true
  },
  citizenship: {
    type:String
  },
  date: {
    type: Date,
    default: Date.now
  }
})
function validateCandidate(candidate) {
    const schema = Joi.object().keys({
      name: Joi.string().min(3).required(),
      email: Joi.string().email().required(),
      citizenship:Joi.string().required()
    });
  
    return schema.validate(candidate);
  }

module.exports.Candidate = mongoose.model('candidate', CandidateSchema)
module.exports.CandidateFinal = mongoose.model('CandidateFinal', CandidateSchema)
module.exports.validate = validateCandidate


