const express = require('express');
const authController = require('../controllers/auth.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

router.get('/', (req,res)=>{
    console.log("user requested to the api");
    res.status(200).json({message: "Welcome to the Auth Api"})
})

//* User Auth api's routes
router.post("/user/register", authController.registerUser)
router.post("/user/login", authController.loginUser)
router.post("/user/logout", authController.logoutUser)
router.get("/user/", authMiddleware.authUserMiddleware, authController.currentUser)

//* Food Partner Auth api's routes
router.post("/foodPartner/register", authController.registerFoodPartner)
router.post("/foodPartner/login", authController.loginFoodPartner)
router.get("/foodPartner/logout", authController.logoutFoodPartner)
router.get("/foodPartner/", authMiddleware.authFoodMiddleware, authController.currentFoodPartner)


module.exports = router;