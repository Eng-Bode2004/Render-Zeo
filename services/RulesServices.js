const RulesModel = require("../models/Rules");

class RulesService {
    async createRule(ruleData) {
        try {
            const { name,description,imageUrl } = ruleData;

            // Validate input
            if (!name||!description||!imageUrl) {
                return Promise.reject(new Error("Please enter all Fields required!"));
            }

            // Check if Rule exists (with await)
            const existRule = await RulesModel.findOne({ name });
            if (existRule) {
                return Promise.reject(new Error("Rule already exists!"));
            }

            // Create and save new rule
            const newRule = new RulesModel({ name,description,imageUrl });
            await newRule.save();
            return newRule;
        } catch (error) {
            throw error;
        }
    }


    async getAllRules() {
        try {

            return await RulesModel.find();
        }

        catch (error) {
            throw error;
        }
    }

    async deleteRule(ruleId) {
        try {
            if (!ruleId) {
                return Promise.reject(new Error("Please enter ruleId which is required!"));
            }
            return await RulesModel.findByIdAndDelete(ruleId);

        }
        catch (error) {
            throw error;
        }
    }
}

module.exports = new RulesService();