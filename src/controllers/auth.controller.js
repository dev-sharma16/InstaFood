const User = require("../models/user.model");
const bcryptjs = require("bcryptjs");
const jwt = require('jsonwebtoken');
//todo: add cookie options
//todo: remove password when sending the registerd user to frontend
async function registerUser(req, res) {
    const {fullName, username, email, password} = req.body;
    if(!fullName || !username || !email || !password){
        return res
        .status(400)
        .json({
            success: false,
            message: "All fields are required"
        })
    }

    const isEmailExists = await User.findOne({email: email});
    if(isEmailExists){
        return res
        .status(400)
        .json({
            success: false,
            message: "Email already Exists"
        })
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    const userCreated = await User.create({
        fullName: fullName,
        username: username,
        email: email,
        password: hashedPassword
    });
    if(!userCreated){
        return res
        .status(500)
        .json({
            success: false,
            message: "Something went wrong while registering the user"
        })
    }

    const token = jwt.sign({ id: userCreated._id}, process.env.JWT_SECRET);
    res.cookie("token", token)

    return res
    .status(201)
    .json({
        success: true,
        message: "User created Successfully",
        userCreated,
    })
};

module.exports = { registerUser };