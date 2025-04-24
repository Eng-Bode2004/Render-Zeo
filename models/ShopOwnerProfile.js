const mongoose = require('mongoose');
const validator = require('validator');

const validateEgyptianNationalID = function(value) {
    // Validate Egyptian 14-digit national ID format
    return /^[23]\d{13}$/.test(value); // 2 for 1900s, 3 for 2000s births
};


const ShopOwnerProfileSchema = new mongoose.Schema({
    User:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Users',
    },

    PII:{
        type:String,
        required:true,
    },

    PIINumber:{
        type:Number,
        required:true,
        validate:{
            validator:validateEgyptianNationalID,
            message:"Please enter valid Egyptian National ID"
        },
    },

    monthly_revenue:{
        type:Number,
    },

    yearlyRevenue:{
        type:Number,
    },

    BankAccount:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'BankAccount',
    },

    business_license:{
        type:String,
        required:true,
    },

    tax_id:{
        type:String,
    },


})
module.exports = mongoose.model('ShopOwnerProfile',ShopOwnerProfileSchema);