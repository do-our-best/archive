// 도메인을 등록하는 화면

const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { User, Domain } = require('../models');
const { inLoggedIn, isLoggedIn } =require('./middlewares');

const router = express.Router();

// 로그인 화면
router.get('/', async (req,res,next)=>{
    try {
        const user = await User.findOne({
            where: { id: req.user && req.user.id || null},
            include: { model: Domain },
        });
        res.render('login', {
            user,
            domains: user && user.Domains,
        });
    } catch(err) {
        console.error(err);
        next(err);
    }
});

// 도메인 등록 화면 -> 폼으로부터 온 데이터를 도메인 모델에 저장
router.post('/domain', isLoggedIn, async (req,res,next)=>{
    try {
        await Domain.create({
            UserId: req.user.id,
            host: req.body.host,
            type: req.body.type,
            clientSecret: uuidv4(),
        });
        res.redirect('/');
    } catch(err){
        console.error(err);
        next(err);
    }
});

module.exports = router;