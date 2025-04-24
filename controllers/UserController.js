const UserService = require('../services/UsersServices');
const {compare} = require("bcryptjs");

class UserController {

    async registerUser(req, res) {
        try {
            const userData = req.body;
            const newUser = await UserService.registerUser(userData);
            res.status(200).json({
                message: 'User registered successfully.',
                user: newUser,
            });
        }

        catch(err) {
            res.status(400).json({
                error: err.message,
            })
        }

    }


    async assignUser(req, res) {
        try {
            const { userId } = req.params;  // Changed to 'id' to match route parameter
            const { ruleId } = req.body;
            if (!ruleId) {
                return res.status(400).json({
                    error: 'Rule ID is required in request body'
                });
            }

            const updatedUser = await UserService.assignRule(userId, ruleId);

            res.status(200).json({
                status: 'success',
                message: 'Rule assigned successfully.',
                user: updatedUser
            });
        } catch (error) {
            res.status(400).json({
                status: 'failure',
                error: error.message
            });
        }
    }


    async loginUser(req, res) {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return res.status(400).json({
                    status: 'failure',
                    message: 'Email and Password are required'
                })
            }
            const userData = {email, password};
            const existUser = await UserService.loginUser(userData);
            res.status(200).json({
                status: 'success',
                message: 'User login successfully.',
                user: existUser
            })

        }

        catch (error){
            res.status(400).json({
                error: error.message,
            })
        }
    }


    async getUserProfile(req, res) {
        try {
            const { userId } = req.params; // Correct destructuring
            if (!userId) {
                return res.status(400).json({
                    status: 'failure',
                    message: 'User ID is required in request as a Parameter'
                })
            }
            const user = await UserService.getUserProfile(userId);
            res.status(200).json({
                status: 'success',
                message: 'User profile successfully.',
                user: user
            })

        }

        catch (error) {
            res.status(400).json({
                error: error.message,
            })
        }
    }

}
module.exports = new UserController;