const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Joi = require("joi");
const { string } = require('joi');

// Create Schema
const VoterSchema = new Schema({
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
function validateVoter(candidate) {
    const schema = Joi.object().keys({
      name: Joi.string().min(3).required(),
      email: Joi.string().email().required(),
      citizenship: Joi.string().required(),
    });
  
  return schema.validate(candidate); 
  
  }

module.exports.Voter = mongoose.model('voter', VoterSchema)
module.exports.VoterFinal = mongoose.model(
  "voterFinal",
  VoterSchema
);

module.exports.validate = validateVoter