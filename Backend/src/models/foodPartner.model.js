const mongoose = require("mongoose");

const foodPartnerSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        username: {
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true
    }
)

const FoodPartner = mongoose.model("FoodPartner", foodPartnerSchema);

module.exports = FoodPartner;
