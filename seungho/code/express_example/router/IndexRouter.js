const express = require("express");

const router = express.Router();

router.get("/",async (req,res,next)=>{
    try{
        console.log(req.session)
        console.log(req.signedCookies)
        const sessionKey = req.signedCookies['name'];
        const userName = req.session[sessionKey];
        res.render("index",{
            userName
        })
    }catch (err){
        next(err);

    }

});

router.post("/",async (req,res)=>{
    try{

    }catch (err){

    }
});

module.exports = router;