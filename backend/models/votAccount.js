const mongoose = require('mongoose')

const accountSchema = new mongoose.Schema({
    account:{
        type: String,
    },
    details:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'voter'

    }
})

module.exports.voteAccountSchema = mongoose.model('voteAccount' , accountSchema)
