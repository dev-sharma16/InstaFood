const express = require('express');

const router = express.Router();

router.get('/', (req,res)=>{
    console.log("user requested to the api");
    res.status(200).json({message: "Welcome to the api"})
})

module.exports = router;