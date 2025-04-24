const ShopTypeService = require("../services/ShopTypeServices");

class ShopTypeController {
    async createShopType(req, res) {
        try {
            const {name, description, icon} = req.body;
            if(!name || !description || !icon) {
                res.status(400).send({
                    status: 'Failed',
                    message: 'Please enter All Fields Required!'
                });
            }
            const shopTypeData = {name, description, icon};
            const newShopType = await ShopTypeService.createShopType(shopTypeData);
            res.status(200).send({
                status: 'Success',
                message: 'Shop Type created successfully!',
                ShopType: newShopType,

            });
        }
        catch (error){
            res.status(400).send({
                status: 'Failed',
                message: error.message
            })
        }
    }


    async getAllShopTypes(req, res) {
        try {
            const shopTypes = await ShopTypeService.getAllShopTypes();
            res.status(200).send({
                status: 'Success',
                message: 'Shop Type list successfully!',
                ShopTypes: shopTypes,
            })
        }
        catch (error){
            res.status(400).send({
                status: 'Failed',
                error: error.message
            })
        }
    }
}
module.exports = new ShopTypeController;