const ShopOwnerProfile = require('../models/ShopOwnerProfile');
const UserModel = require('../models/Users');

class ShopOwnerProfileService{

    async createShopOwnerProfile(shopOwnerProfileData){
        try {
            const {User , PII , PIINumber , BankAccount , business_license , tax_id } = shopOwnerProfileData
            if (!User||!PII||!PIINumber||!BankAccount||!business_license||!tax_id){
                return Promise.reject(new Error('All fields are required'));
            }

            // Check if User Profile exists
            const existShopOwnerProfile = await ShopOwnerProfile.findOne({User});
            if(existShopOwnerProfile){
                return Promise.reject(new Error('User Profile already exist'));
            }

            const newShopOwnerProfile = await ShopOwnerProfile.create({
                User,
                PII,
                PIINumber,
                BankAccount,
                business_license,
                tax_id
            })

            // Add Shop Owner ID
            await UserModel.findByIdAndUpdate(
                User,
                { $set: { chosenProfile: newShopOwnerProfile._id } },
                { new: true, runValidators: true }
            );

            return newShopOwnerProfile;

        }

        catch (error) {
            throw error;
        }
    }







}

module.exports = new ShopOwnerProfileService;