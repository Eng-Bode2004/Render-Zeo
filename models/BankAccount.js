const mongoose = require('mongoose');

const BankAccountSchema = mongoose.Schema({
    bankName:{
        type:String,
        required:true,
    },

    iban:{
        type:String,
        required:true,
        unique:true,
    },

    account_holder:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Users',
    },

    account_number:{
        type:String,
        required:true,
    },
})

module.exports = mongoose.model('BankAccount',BankAccountSchema);