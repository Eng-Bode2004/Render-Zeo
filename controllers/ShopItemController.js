const ShopItemService = require('../services/ShopItemServices');

class ShopItemController {
    async CreateShopItems(req,res) {
        try {

            const {shop_id}= req.params;
            const {name,price,description,item_image} = req.body;

            if(!shop_id||!name||!price||!description||!item_image){
                res.status(400).send({
                    error: 'Please enter Shop Id required.',
                    status:"Failed",
                });
            }

            const shopData =  {shop_id,name,price,description,item_image};

            const newItem =await ShopItemService.CreateShopItems(shopData);
            res.status(200).send({
                status:"success",
                message:"Successfully created",
                data:newItem,
            });

        }
        catch (error){
            res.status(400).send({
                error: error.message,
                status:"Failed",
            })
        }

    }
}

module.exports =new ShopItemController;