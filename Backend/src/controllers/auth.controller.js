const User = require("../models/user.model");
const FoodPartner =  require("../models/foodPartner.model");
const bcryptjs = require("bcryptjs");
const jwt = require('jsonwebtoken');

//todo: add cookie options for register user and login user 

const userReturnObject = (user) => {
    return {
        _id: user._id,
        fullName: user.fullName,
        username: user.username,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role
    }
}

//* User Auth api's
async function registerUser(req, res) {
    const { fullName, username, email, password, phone, address } = req.body;
    if(!fullName || !username || !email || !password || !phone || !address ){
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
        password: hashedPassword,
        phone: phone,
        address: address,
        role: "user"
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
        user: userReturnObject(userCreated),
    })
};

async function loginUser(req, res) {
    const { usernameOrEmail, password } = req.body;
    if(!usernameOrEmail || !password){
        return res
        .status(400)
        .json({
            success: false,
            message: "Required all fields"
        })
    };

    const user = await User.findOne({
        $or: [ { username: usernameOrEmail }, { email: usernameOrEmail } ]
    });
    if(!user){
        return res
        .status(500)
        .json({
            success: false,
            message: "User not exists"
        })
    };

    const isPasswordCorrect = await bcryptjs.compare(password, user.password);
    if(!isPasswordCorrect){
        return res
        .status(400)
        .json({
            success: false,
            message: "Invalid credentials"
        })
    };

    const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET
    )
    res.cookie("token", token);

    return res
    .status(200)
    .json({
        success: true,
        message: "User logined successfully",
        user: userReturnObject(user)
    })
}

async function logoutUser(req,res) {
    res.clearCookie("token")
    return res
    .status(200)
    .json({
        success: true,
        message: "User logout successfully"
    })
}

//* Food Partner Auth api's
async function registerFoodPartner(req, res) {
    const { name, username, email, password, phone, address } = req.body;
    if(!name || !username || !email || !password || !phone || !address){
        return res
        .status(400)
        .json({
            success: false,
            message: "All fields are required"
        })
    }

    const isEmailExists = await FoodPartner.findOne({email: email});
    if(isEmailExists){
        return res
        .status(400)
        .json({
            success: false,
            message: "Email already Exists"
        })
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    const foodPartner = await FoodPartner.create({
        name: name,
        username: username,
        email: email,
        password: hashedPassword,
        phone: phone,
        address: address,
        role: "foodPartner"
    });
    if(!foodPartner){
        return res
        .status(500)
        .json({
            success: false,
            message: "Something went wrong while registering the Food Partner"
        })
    }

    const token = jwt.sign({ id: foodPartner._id}, process.env.JWT_SECRET);
    res.cookie("token", token)

    return res
    .status(201)
    .json({
        success: true,
        message: "Food Partner created Successfully",
        food_partner: userReturnObject(foodPartner)
    })
}

async function loginFoodPartner(req, res) {
    const { usernameOrEmail, password } = req.body;
    if(!usernameOrEmail || !password){
        return res
        .status(400)
        .json({
            success: false,
            message: "Required all fields"
        })
    };

    const foodPartner = await FoodPartner.findOne({
        $or: [ { username: usernameOrEmail }, { email: usernameOrEmail } ]
    });
    if(!foodPartner){
        return res
        .status(500)
        .json({
            success: false,
            message: "Food Partner not exists"
        })
    };

    const isPasswordCorrect = await bcryptjs.compare(password, foodPartner.password);
    if(!isPasswordCorrect){
        return res
        .status(400)
        .json({
            success: false,
            message: "Invalid credentials"
        })
    };

    const token = jwt.sign(
        { id: foodPartner._id },
        process.env.JWT_SECRET
    )
    res.cookie("token", token);

    return res
    .status(200)
    .json({
        success: true,
        message: "User logined successfully",
        food_partner: userReturnObject(foodPartner)
    })
}

async function logoutFoodPartner(req,res) {
    res.clearCookie("token")
    return res
    .status(200)
    .json({
        success: true,
        message: "Food Partner logout successfully"
    })
}

module.exports = { 
    registerUser, loginUser, logoutUser, 
    registerFoodPartner, loginFoodPartner, logoutFoodPartner
};