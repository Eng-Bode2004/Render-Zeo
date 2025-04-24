const BankAccountModel = require('../models/BankAccount');

class BankAccountService {
    async createBankAccount(BankAccountData) {
        try {
            const { bankName, iban , account_holder , account_number} = BankAccountData;

            if (!bankName||!iban||!account_holder||!account_number) {
                return Promise.reject(new Error('Enter valid bank Account Data'));
            }

            const existIban = await BankAccountModel.findOne({iban});
            if (existIban) {
                return Promise.reject(new Error('Iban account already exists'));
            }

            const bankAccount = await BankAccountModel.create({
                bankName,
                iban,
                account_holder,
                account_number,
            });

            return bankAccount;
        }catch (error){
            return Promise.reject(new Error('Failed to create bank account'));
        }

    }


}

module.exports = new BankAccountService;