const Food = require("../models/food.model");
const storageService = require("../services/storage.service");

async function createFood(req, res) {
    const foodPartner = req.foodPartner;
    const { name, description } = req.body;
    const video = req.file;
    if(!name || !video){
        return res
        .status(400)
        .json({
            success: true,
            message: "Name and video both are required"
        })
    }

    const uploadedFile = await storageService.uploadFile(video);
    if(!uploadedFile.success){
        return res
        .status(500)
        .json({
            success: false,
            message: "Something went wrong while uploading video file on ImageKit"
        })
    }

    const createdFood = await Food.create({
        name: name,
        video: uploadedFile.url,
        videoId: uploadedFile.fileId,
        description: description,
        foodPartner: foodPartner._id
    })
    if(!createdFood){
        return res
        .status(500)
        .json({
            success: false,
            message: "Something went wrong while creating food on Db"
        })
    }

    return res
    .status(201)
    .json({
        success: true,
        message: "Food is added successfully",
        food: createdFood
    })
}

async function getFood(req, res) {
    const foodItems = await Food.find({})
    if(!foodItems){
        return res
        .status(500)
        .json({
            success: false,
            message: "No food itmes found"
        })
    }

    return res
    .status(200)
    .json({
        success: true,
        message: "Food itmes fetched successfully",
        foodItems,
    })
}
module.exports = {
    createFood,
    getFood
};
