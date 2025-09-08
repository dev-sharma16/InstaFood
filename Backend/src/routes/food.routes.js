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

// for normal user to see video and food details
router.get(
    "/", 
    authMiddleware.authUserMiddleware,  
    foodController.getFood
)

module.exports = router;
