const ShopService = require('../services/ShopServices');

class ShopController{
    async createShop(req, res){
        try {

            const { ShopOwner }= req.params;
            const { name, description , cover_image , Logo , ShopType } = req.body;
            if(!ShopOwner){
                res.status(400).send({
                    error: 'Enter ShopOwner id ',
                });
            }
            if (!name || !description|| !cover_image || !Logo || !ShopType){
                res.status(400).send({
                    error: 'Enter all Fields Required in The Request',
                })
            }
            const shopData = {ShopOwner , name, description , cover_image , Logo , ShopType }
            const newShop = await ShopService.createShop(shopData);
            res.status(200).send({
                status: 'success',
                message: 'Shop created successfully',
                shop: newShop,
            });


        }
        catch (error){
            res.status(400).send({
                error: error.message,
                message: "Failed to create Shop",
            })
        }

    }

    async ChoosingShopType(req,res){
        try {
            const { shopId }= req.params;
            const {ShopType} = req.body;

            if(!shopId||!ShopType){
                res.status(400).send({
                    error: 'Enter all Fields Required in The Request ',
                })
            }
            const shop =await ShopService.ChoosingShopType(shopId, ShopType);
            res.status(200).send({
                status: 'success',
                message: 'Type selected successfully',
                Shop: shop,
            })


        }
        catch (error){
            res.status(400).send({
                error: error.message,
            })
        }
    }

    async getShopItems(req,res){
        try {
            const { shop_id } = req.params;

            if (!shop_id){
                res.status(400).send({
                    message: 'Enter Filed Required in The Request ',
                    status:'Failure',
                })
            }

            const shopItems = await ShopService.getShopItems(shop_id);
            res.status(200).send({
                status: 'success',
                message: 'Shop item list successfully',
                shopItems: shopItems,
            })

        }
        catch (error){
            res.status(400).send({
                error: error.message,
                message: "Failed to get Shop Items",
            })
        }
    }


}

module.exports = new ShopController;