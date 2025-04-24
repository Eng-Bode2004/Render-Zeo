const UserModel = require("../models/Users");  //Requiring User Model
const bcrypt = require('bcryptjs'); // Requiring bcrypt for Hashing The Password
const jwt = require('jsonwebtoken');
const mongoose = require("mongoose");
require('dotenv').config();

class UsersServices {

    // Sign Up New User

    // Step One : Entering Main fields
    async registerUser(userData) {
        const { firstName, lastName, email , phoneNumber , password , confirmPassword , username } = userData;

        // make sure that all important Fields are required
        if (!firstName || !lastName || !email || !phoneNumber || !password || !confirmPassword || !username ) {
            return Promise.reject(new Error("Please enter All Fields Required"));
        }

        //make sure That Password is Equal to Confirm Password
        if (password !== confirmPassword) {
            return Promise.reject(new Error("Passwords do not match"));
        }

        // Make sure That User doesnt Exists
        const existingUser = await UserModel.findOne({email: email}, {phoneNumber: phoneNumber});
        if (existingUser) {
            return Promise.reject(new Error("User already exists"));
        }

        //Hashing The Password
        const HashedPass = await bcrypt.hash(password, 5);

        // Hashing Confirm Password
        const HashedConfirmPass = await bcrypt.hash(confirmPassword, 5);

        //Create new User
        const newUser = await UserModel.create({
            firstName,
            lastName,
            username,
            email,
            phoneNumber,
            password:HashedPass,
            confirmPassword:HashedConfirmPass,
        })
        return newUser;
    }

    // assign Rule
    async assignRule(userId, ruleId) {
        try {
            if (!userId || !ruleId) {
                return Promise.reject(new Error("Please enter All Fields Required"));
            }

            if (!mongoose.Types.ObjectId.isValid(userId)) {
                return Promise.reject(new Error("Invalid UserID"));
            }

            if (!mongoose.Types.ObjectId.isValid(ruleId)) {
                return Promise.reject(new Error("Invalid Rule ID"));
            }

            const newUser = await UserModel.findByIdAndUpdate(userId, {$set:{Rules: ruleId}},{new: true,runValidators: true}).populate("Rules");

            if (!newUser) {
                return Promise.reject(new Error("Invalid UserID"));
            }
            return newUser;
        }

        catch (error) {
            throw error;
        }
    }

    async loginUser(userData) {

        try {

            const { email, password } = userData;
            if (!email || !password) {
                return Promise.reject(new Error("Please enter All Fields Required"));
            }

            // Check if user exists
            const existUser = await UserModel.findOne({email: email}).populate("Rules");
            if (!existUser) {
                return Promise.reject(new Error("Invalid email"));
            }


            // Validate Password
            const ValidPass = await bcrypt.compare(password, existUser.password);
            if (!ValidPass || !existUser) {
                return Promise.reject(new Error("Invalid email or Password"));
            }

            // Generate Token : Header . Payload . Signature
            // Payload: main Data You store in The Token

            const token = jwt.sign(
                {
                    userId:existUser._id,
                    role:existUser.Rules.name,
                },
                process.env.JWT_SECRET,

                {expiresIn: "1h"}
            );

            return {
                token: token,
                user:{
                    userId:existUser._id,
                    username:existUser.username,
                    email:existUser.email,
                    role:existUser.Rules.name,
                }
            };


        }

        catch (error) {
            throw error;
        }

    }


    async getUserProfile(userId) {

        try {
            if (!userId) {
                return Promise.reject(new Error("Please enter All Fields Required"));

            }
            const user = await UserModel.findById(userId).select('chosenProfile').populate('chosenProfile');
            if (!user) {
                return Promise.reject(new Error("Invalid UserID"));
            }
            return user;
        }

        catch (error) {
            throw error;
        }
    }



}
module.exports = new UsersServices;