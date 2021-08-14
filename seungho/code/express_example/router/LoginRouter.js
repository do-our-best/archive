const express = require("express");

const router = express.Router();

router.get("/login",async (req,res,next)=>{
    try{
        res.render("login");

    }catch (err){
        next(err);
    }
})
router.post("/login",async (req,res,next)=>{
    try{
        const {name} = req.body;// == req.body.name
        const sessionKey = new Date().getTime();
        res.cookie("name",sessionKey,{
            httpOnly:true,
            secure:true,
            signed:true,
        });
        req.session[sessionKey] = name;
        res.send("OK")
    }catch (err){
        console.log(err);
        next(err);
    }
})

module.exports = router;