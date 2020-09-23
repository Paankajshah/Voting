const mongoose = require('mongoose')
const Joi = require('joi')
const accountSchema = new mongoose.Schema({
    account:{
        type: String,
    },
    details:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'candidate'

    }
})

function validateAccount(candidate) {
    const schema = Joi.object().keys({
      account: Joi.string().required(),
      id: Joi.string().required(),
    });
  
    return schema.validate(candidate);
  }

module.exports.candAccountSchema = mongoose.model('candAccount', accountSchema)
module.exports.validate = validateAccount;

