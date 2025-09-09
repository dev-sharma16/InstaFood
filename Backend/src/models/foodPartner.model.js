const mongoose = require("mongoose");

const foodPartnerSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        },
        address: {
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
        },
        role: {
            type: String,
            required: true
        },
    },
    {
        timestamps: true
    }
)

const FoodPartner = mongoose.model("FoodPartner", foodPartnerSchema);

module.exports = FoodPartner;
