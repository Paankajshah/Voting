const mongoose = require('mongoose')

const accountSchema = new mongoose.Schema({
    account:{
        type: String,
    },
    details:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'candidate'

    }
})

module.exports.candAccountSchema = mongoose.model('candAccount' , accountSchema)
