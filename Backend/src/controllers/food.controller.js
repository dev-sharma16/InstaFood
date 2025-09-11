const { default: mongoose } = require("mongoose");
const Food = require("../models/food.model");
const Like = require("../models/like.model");
const Save = require("../models/save.model");
const storageService = require("../services/storage.service");

async function createFood(req, res) {
  const foodPartner = req.foodPartner;
  const { name, description } = req.body;
  const video = req.file;
  if (!name || !video) {
    return res.status(400).json({
      success: true,
      message: "Name and video both are required"
    });
  }

  const uploadedFile = await storageService.uploadFile(video);
  if (!uploadedFile.success) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong while uploading video file on ImageKit"
    });
  }

  const createdFood = await Food.create({
    name: name,
    video: uploadedFile.url,
    videoId: uploadedFile.fileId,
    description: description,
    foodPartner: foodPartner._id
  });
  if (!createdFood) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong while creating food on Db"
    });
  }

  return res.status(201).json({
    success: true,
    message: "Food is added successfully",
    food: createdFood
  });
}

async function getFood(req, res) {
  const userId = req.user?._id;

  const foodItems = await Food.aggregate([
      {
        $lookup: {
          from: "likes",
          let: { foodId: "$_id" },
          pipeline: [
            { $match: { $expr: { $and: [
              { $eq: ["$food", "$$foodId"] },
              { $eq: ["$user", userId] }
            ]}}},
          ],
          as: "userLikes"
        }
      },
      {
        $lookup: {
          from: "saves",
          let: { foodId: "$_id" },
          pipeline: [
            { $match: { $expr: { $and: [
              { $eq: ["$food", "$$foodId"] },
              { $eq: ["$user", userId] }
            ]}}},
          ],
          as: "userSaves"
        }
      },
      {
        $addFields: {
          isLiked: { $gt: [{ $size: "$userLikes" }, 0] },
          isSaved: { $gt: [{ $size: "$userSaves" }, 0] }
        }
      },
      {
        $project: { userLikes: 0, userSaves: 0 }
      }
    ]);
  if (!foodItems) {
    return res.status(500).json({
      success: false,
      message: "No food itmes found"
    });
  }

  return res.status(200).json({
    success: true,
    message: "Food itmes fetched successfully",
    foodItems
  });
}

async function getFoodById(req, res) {
  const userId = req.user?._id;
  const foodId = req.params.id;

  const foodItem = await Food.aggregate([
      {
        $match: { _id: foodId}
      },
      {
        $lookup: {
          from: "likes",
          let: { foodId: "$_id" },
          pipeline: [
            { $match: { $expr: { $and: [
              { $eq: ["$food", "$$foodId"] },
              { $eq: ["$user", userId] }
            ]}}},
          ],
          as: "userLikes"
        }
      },
      {
        $lookup: {
          from: "saves",
          let: { foodId: "$_id" },
          pipeline: [
            { $match: { $expr: { $and: [
              { $eq: ["$food", "$$foodId"] },
              { $eq: ["$user", userId] }
            ]}}},
          ],
          as: "userSaves"
        }
      },
      {
        $addFields: {
          isLiked: { $gt: [{ $size: "$userLikes" }, 0] },
          isSaved: { $gt: [{ $size: "$userSaves" }, 0] }
        }
      },
      {
        $project: { userLikes: 0, userSaves: 0 }
      }
    ]);
  if (!foodItem) {
    return res.status(500).json({
      success: false,
      message: "No food itme found"
    });
  }

  return res.status(200).json({
    success: true,
    message: "Food itme fetched successfully",
    foodItem: foodItem[0]
  });
}

async function likeFood(req, res) {
  const { foodId } = req.body;
  const user = req.user;

  const isAlreadyLiked = await Like.findOne({
    user: user._id,
    food: foodId
  });
  if (isAlreadyLiked) {
    await Like.deleteOne({
      user: user._id,
      food: foodId
    });
    const updatedCount = await Food.findByIdAndUpdate(
      foodId,
      { $inc: { likeCount: -1 } },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      message: "Video unliked successfully",
      likeCount: updatedCount.likeCount
    });
  }

  const likeFood = await Like.create({
    user: user._id,
    food: foodId
  });
  const updatedCount = await Food.findByIdAndUpdate(
    foodId,
    { $inc: { likeCount: 1 } },
    { new: true }
  );
  if (!likeFood) {
    return res.status(500).json({
      success: false,
      message: "Error in Liking the video"
    });
  }

  return res.status(201).json({
    success: true,
    message: "Video liked successfully",
    likeCount: updatedCount.likeCount
  });
}

async function saveFood(req, res) {
  const { foodId } = req.body;
  const user = req.user;

  const isAlreadySaved = await Save.findOne({
    user: user._id,
    food: foodId
  });
  if (isAlreadySaved) {
    await Save.deleteOne({
      user: user._id,
      food: foodId
    });
    const updatedCount = await Food.findByIdAndUpdate(
      foodId,
      { $inc: { saveCount: -1 } },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      message: "Video unsaved successfully",
      saveCount: updatedCount.saveCount
    });
  }

  const saveFood = await Save.create({
    user: user._id,
    food: foodId
  });
  const updatedCount = await Food.findByIdAndUpdate(
    foodId,
    { $inc: { saveCount: 1 } },
    { new: true }
  );
  if (!saveFood) {
    return res.status(500).json({
      success: false,
      message: "Error in Saving the video"
    });
  }

  return res.status(201).json({
    success: true,
    message: "Video saved successfully",
    saveCount: updatedCount.saveCount
  });
}

async function getSavedFood(req, res) {
  const user = req.user;

  const savedFood = await Save.find({
    user: user._id
  }).populate("food");
  if (!savedFood) {
    return res.status(500).json({
      success: false,
      message: "Not found Saved Posts"
    });
  }

  return res.status(200).json({
    success: true,
    message: "Fetched saved videos successfully",
    videos: savedFood
  });
}

module.exports = {
  createFood,
  getFood,
  getFoodById,
  likeFood,
  saveFood,
  getSavedFood
};
