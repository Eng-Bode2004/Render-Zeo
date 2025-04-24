const mongoose = require('mongoose');

const RulesModel = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique: true,
    },
    description:{
        type: String,
        required: true,
    },
    imageUrl:{
        type: String,
    },

},{timestamps:true});
module.exports = mongoose.model('Rules', RulesModel);