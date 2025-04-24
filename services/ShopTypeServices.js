const ShopTypeModel = require("../models/ShopType");

class ShopTypeService {
    async createShopType(shopTypeData) {
        try {
            const {name, description , icon } = shopTypeData;
            if (!name || !description || !icon) {
                return Promise.reject(new Error("Please enter All Fields Required!"));
            }

            // Check if Shop Type already created
            const existType = await ShopTypeModel.findOne({name});
            if(existType){
                return Promise.reject(new Error("Shop already exist"));
            }

            const newShopType = await ShopTypeModel.create({
                name,
                description,
                icon
            });
            return newShopType;
        }catch(err){
            return Promise.reject(err);
        }
    }

    async getAllShopTypes() {
        return ShopTypeModel.find();
    }

}

module.exports = new ShopTypeService();