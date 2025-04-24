const mongoose = require('mongoose');

const ShopItemModel =new mongoose.Schema({

    shop_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Shop',
    },

    name:{
        type: String,
        required: true,
    },

    price:{
        type: Number,
        required: true,
    },

    description:{
        type: String,
        required: true,
    },

    item_image:{
        type: String,
        required: true,
    },

    available:{
        type: Boolean,
        default: true,
    },
})
module.exports = mongoose.model('ShopItem',ShopItemModel)