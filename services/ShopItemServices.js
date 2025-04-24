const ShopItemSchema = require('../models/ShopItems');
const ShopModel = require('../models/Shop');

class ShopItemServices {
    async CreateShopItems(shopData){
        try {
            const {shop_id,name,price,description,item_image} = shopData;

            if(!shop_id||!name||!price||!description||!item_image){
                return Promise.reject(new Error('Please enter all fields required.'));
            }

            // Verify shop exists
            const shopExists = await ShopModel.findById(shop_id);
            if (!shopExists) {
                return Promise.reject(new Error('Please enter all fields required.'));
            }

            //Check if Item Exists
            const existItem = await ShopItemSchema.findOne({name:name});
            if (existItem) {
                return Promise.reject(new Error('Item already exists.'));
            }


            const newItem = await ShopItemSchema.create({
                shop_id,
                name,
                price,
                description,
                item_image,
            })


            await ShopModel.findByIdAndUpdate(shop_id, { $push: { ShopItems: newItem._id }},{new: true});

            return newItem;

        }
        catch (error){
            throw error;
        }
    }


}

module.exports = new ShopItemServices;