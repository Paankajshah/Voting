const mongoose = require('mongoose')
const Joi = require('joi')
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
    party: {
      type: String,
    }
  },
});

function validateAccount(candidate) {
    const schema = Joi.object().keys({
      citizenship: Joi.string().required(),
      account: Joi.string().required(),
      key: Joi.string().required(),
      id: Joi.string().required(),
    });
  
    return schema.validate(candidate);
  }

module.exports.candAccountSchema = mongoose.model('candAccount', accountSchema)
module.exports.validate = validateAccount;

