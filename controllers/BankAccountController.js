const BankAccountService = require('../services/BankAccountServices');

class BankAccountController{
    async createBankAccount(req, res) {
        try {
            const {account_holder} = req.params;
            const {bankName,iban,account_number} = req.body;

            if(!account_holder){
                return res.status(400).json({
                    error: 'account_holder not found'
                })
            }

            if (!bankName||!iban||!account_number){
                return res.status(400).json({
                    status:'failure',
                    message:'enter all Bank Fields',
                })
            }
            const BankAccount = {bankName, iban , account_holder , account_number}

            const newBankAccount =await BankAccountService.createBankAccount(BankAccount);
            res.status(200).json({
                status:'success',
                BankAccount: newBankAccount,
                message: 'Bank Account Created Successfully'
            });

        }
        catch (error){
            res.status(400).send({
                message: error.message,
                status: "Failed",
            })
        }
    }
}

module.exports =new BankAccountController;