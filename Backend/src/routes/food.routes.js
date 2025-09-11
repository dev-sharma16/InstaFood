const express = require("express");
const foodController = require("../controllers/food.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const multer = require("multer");

const router = express.Router();
const upload = multer({
    storage: multer.memoryStorage()
});

// for food partners to  add food
router.post(
    "/", 
    authMiddleware.authFoodMiddleware, 
    upload.single("video"), 
    foodController. createFood
);

// for normal user to see videos and foods details
router.get(
    "/", 
    authMiddleware.authUserMiddleware,  
    foodController.getFood
)

// for normal user to see video and food details
router.get(
    "/:id", 
    authMiddleware.authUserMiddleware,  
    foodController.getFoodById
)

// for liking video
router.post(
    "/like",
    authMiddleware.authUserMiddleware,
    foodController.likeFood
)

// for saving the food post
router.post(
    "/save",
    authMiddleware.authUserMiddleware,
    foodController.saveFood
)

router.get(
    "/save",
    authMiddleware.authUserMiddleware,
    foodController.getSavedFood
)

module.exports = router;
