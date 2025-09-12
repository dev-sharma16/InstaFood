const FoodPartner = require("../models/foodPartner.model");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

async function authFoodMiddleware(req, res, next) {
    const token = req.cookies.token;
    if(!token){
        return res
        .status(500)
        .json({
            success: false,
            message: "Usern not logined, login first"
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const foodPartner = await FoodPartner.findById(decoded.id).select("-password");

        req.foodPartner = foodPartner;

        next();
    } catch (error) {
        return res
        .status(400)
        .json({
            success: false,
            message: "Invalid Token"
        })
    }
}

async function authUserMiddleware(req, res, next) { 
    const token = req.cookies.token;
    if(!token){
        return res
        .status(500)
        .json({
            success: false,
            message: "Usern not logined, login first"
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.id).select("-password");

        req.user = user;

        next();
    } catch (error) {
        return res
        .status(400)
        .json({
            success: false,
            message: "Invalid Token"
        })
    }
}

module.exports = {
    authFoodMiddleware,
    authUserMiddleware
};
