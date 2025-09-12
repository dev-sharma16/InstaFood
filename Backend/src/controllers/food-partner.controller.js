const FoodPartner = require("../models/foodPartner.model");
const Food = require("../models/food.model.js"); 

async function getFoodPartnerById(req, res){
  const foodPartnerId = req.params.id;

  const foodPartner = await FoodPartner.findById(foodPartnerId).select("-password");
  if(!foodPartner){
    return res
    .status(500)
    .json({
      success: false,
      message: "Food Partner not found"
    })
  }

  const foodItemsByFoodPartner = await Food.find({ foodPartner: foodPartnerId })
  if(!foodItemsByFoodPartner){
    return res
    .status(500)
    .json({
      success: false,
      message: "Food Items not found"
    })
  }

  return res
  .status(200)
  .json({
    success: true,
    message: "Food Partner fetched successsfully",
    foodPartner,
    foodItems: foodItemsByFoodPartner,
  })
}

module.exports = { getFoodPartnerById }
