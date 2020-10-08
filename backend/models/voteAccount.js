const mongoose = require('mongoose')
const Joi = require("joi");

const accountSchema = new mongoose.Schema({
  citizenship: {
    type: String,
  },
  account: {
    type: String,
  },
    key: {
      type: String,
    },
  details: {
    name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    citizenship: {
      type: String,
    },
  },
});
function validateAccount(voter) {
    const schema = Joi.object().keys({
      citizenship: Joi.string().required(),
      key: Joi.string().required(),

      account: Joi.string().required(),
      id: Joi.string().required(),
    });
  
    return schema.validate(voter);
  }
 

module.exports.voteAccountSchema = mongoose.model('voteAccount' , accountSchema)
module.exports.validate = validateAccount;
