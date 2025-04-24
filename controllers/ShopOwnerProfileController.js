const ShopOwnerProfileServices = require('../services/ShopOwnerProfileService');

class ShopOwnerProfileController {
    async createShopOwnerProfile(req,res){

        try {
            const {User} =  req.params;
            const {PII , PIINumber , BankAccount , business_license , tax_id } = req.body;
            if (!User || !PII ||!PIINumber|| !BankAccount || !business_license || !tax_id){
                res.status(400).send({
                    error:'Please fill out all fields',
                    status:'Failure',
                    message:'Please fill out all fields'
                });
            }

            const shopOwnerProfileData =  {User , PII , PIINumber , BankAccount , business_license , tax_id }

            const newShopOwnerProfile = await ShopOwnerProfileServices.createShopOwnerProfile(shopOwnerProfileData);
            res.status(200).send({
                status:'success',
                message:'Successfully created shopOwnerProfile',
                shopOwnerProfile:newShopOwnerProfile,
            });
        }

        catch (error){
            res.status(400).json({
                error: error,
                status:'Failed to create ShopOwnerProfile',
                message:error.message,
            });
        }
    }




}

module.exports = new ShopOwnerProfileController;