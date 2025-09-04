const express = require('express');
const authController = require('../controllers/auth.controller');

const router = express.Router();

router.get('/', (req,res)=>{
    console.log("user requested to the api");
    res.status(200).json({message: "Welcome to the Auth Api"})
})

//* User Auth api's routes
router.post("/user/register", authController.registerUser)
router.post("/user/login", authController.loginUser)
router.get("/user/logout", authController.logoutUser)

//* Food Partner Auth api's routes
router.post("/foodPartner/register", authController.registerFoodPartner)
router.post("/foodPartner/login", authController.loginFoodPartner)
router.get("/foodPartner/logout", authController.logoutFoodPartner)


module.exports = router;