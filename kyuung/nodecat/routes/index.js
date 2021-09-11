const express = require('express');
const axios = require('axios');

const router = express.Router();

const URL = 'http://localhost:8002/v1';
axios.defaults.headers.origin = 'http://localhost:4000';

const request = async (req, api) => {
    try {
        if (!req.session.jwt) {  // 세션에 토큰이 없으면 토큰 발급 시도
            const tokenResult = await axios.post(`${URL}/token`, {
                clientSecret : process.env.CLIENT_SECRET,
            });
            req.session.jwt = tokenResult.data.token; // 세션에 토큰 저장
            return await axios.get(`${URL}${api}`, {
                headers: { authorization: req.session.jwt }
            })
        }
    } catch(error) {
        if(error.response.status === 419) { // 토큰 만료 시
            delete req.session.jwt;
            return request(req, api);
        }
        return error.response;
    }
};

router.get('/test', async (req,res,next)=> {
    try {
        const result = await request(req, '/test');
        res.json(result.data);
    } catch (error) {
        console.log(error);
        next(error);
    }
});

router.get('/mypost', async (req,res,next)=> {
    try {
        const result = await request(req,'/posts/my');
        res.json(result.data);
    } catch (error) {
        console.log(error);
        next(error);
    }
});

router.get('/search/:hashtag', async (req,res,next)=> {
    try {
        const result = await request(
            req, `/posts/hashtag/${encodeURIComponent(req.params.hashtag)}`,
        );
        res.json(result.data);
    } catch (error) {
        if(error.code) {
            console.log(error);
            next(error);
        }
    }
});

module.exports = router;