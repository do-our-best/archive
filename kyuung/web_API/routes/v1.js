const express = require('express');
const jwt = require('jsonwebtoken');

const { verifyToken } = require('./middlewares');
const { Domain, User, Post, Hashtag } = require('../models');

const router = express.Router();

// 토큰을 발급하는 라우터
router.post('/token', async (req,res) => {
    const { clientSecret } =req.body; 
    try { // 도메인이 등록된 것인지 확인
        const domain = await Domain.findOne({
            where: { clientSecret },
            include: {
                model: User,
                attributes: ['nick', 'id'],
            },
        });
        if(!domain) { // 등록 안된 도메인
            return res.status(401).json({
                code: 401,
                message: '등록되지 않은 도메인입니다, 도메인을 먼저 등록하세요'
            });
        }
        // !토큰 발급 jwt.sign (토큰의 내용, 토큰 비밀키, 토큰의 설정)
        const token = jwt.sign({
            id:domain.User.id,
            nick: domain.User.nick,
        }, process.env.JWT_SECRET, {
            expiresIn: '1m',
            issuer: 'nodebird',
        });
        return res.json({
            code:200, 
            message: "토큰이 발급되었습니다",
            token,
        });
    } catch(err) {
        console.error(err);
        return res.status(500).json({
            code: 500,
            message: '서버 에러',  
        });
    }
});

// 토큰 테스트 (토큰의 내용물을 응답으로 보낸다.)
router.get('/test', verifyToken, (req, res)=>{
    res.json(req.decoded);
});


router.get('/posts/my', verifyToken, (req,res)=>{
    Post.findAll({ where: { userId: req.decoded.id } })
        .then((posts)=>{
            console.log(posts);
            res.json({
                code: 200,
                payload: posts,
            });
        })
        .catch((error)=> {
            console.error(error);
            return res.status(500).json({
                code: 500,
                message: '서버 에러',
            });
        });
});

router.get('/posts/hashtag/:title', verifyToken, async (req,res)=>{
    try {
        const hashtag = await Hashtag.findOne({ where: { title: req.params.title } });
        if(!hashtag) {
            return res.status(404).json({
                code: 404,
                message: "검색 결과가 없습니다",
            });
        }
        const posts = await hashtag.getPosts();
        return res.json({
            code: 200,
            payload: posts,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            code: 500,
            message: '서버 에러',
        });
    }
});

module.exports = router;