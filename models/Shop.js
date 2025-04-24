const mongoose = require("mongoose");

const ShopSchema = new mongoose.Schema({

    ShopOwner:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Users',
    },

    name:{
        type: String,
        required: true,
        unique: true,
    },

    approved:{
        type:Boolean,
        default: false,
    },

    description:{
        type: String,
    },

    cover_image:{
        type: String,
    },

    Logo:{
        type: String,
    },

    ShopType:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'ShopType',
    },

    ShopItems:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:'ShopItem',
    }


})

module.exports = mongoose.model('Shop', ShopSchema);