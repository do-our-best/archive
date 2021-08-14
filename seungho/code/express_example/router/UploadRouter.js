const express = require("express");
const path = require("path");
const multer = require("multer");

const router = express.Router();

const upload = multer({
    storage:multer.diskStorage({
        destination(req,file,done){
            // null 은 오류처리
            done(null,path.join('public','img'));
        },
        filename(req,file,done){
            const ext = path.extname(file.originalname);
            // null 은 오류처리
            done(null,path.basename(file.originalname,ext)+Date.now()+ext);
        }
    }),
    limits:{
        fileSize:{fileSize: 5*1024*1024},
    }
});
router.get("/upload",async (req,res,next)=>{
    try{
        console.log("asfd")
        res.render("upload");
    }catch (err){
        next(err);
    }
});

router.post("/upload",upload.single("image"),async (req,res,next)=>{
    try{
        console.log(req.file)
        console.log(req.body)
        const filePath = req.file.filename;
        req.app.set("path",filePath);
        res.render("upload",{
            path:filePath
        });
/*
        res.render("upload",{
            path:path
        })
*/
    }catch (err){
        console.log(err)
        next(err);
    }
});

module.exports = router;