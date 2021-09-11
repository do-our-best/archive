const jwt = require('jsonwebtoken');

exports.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(403).send('로그인 필요');
    }
};

exports.isNotLoggedIn = (req,res,next) => {
    if (!req.isAuthenticated()) {
        next();
    } else {
        const message = encodeURIComponent('로그인 한 상태입니당.');
        res.redirect(`/?error=${message}`);
    }
};

// !토큰 유효성 검사 jwt.verify
exports.verifyToken = (req,res,next) => {
    try{
        req.decoded = jwt.verify(req.headers.authorization, process.env.JWT_SECRET); // 헤더에 토큰을 넣어 보낸다. 
        return  next();
    } catch(err) {
        if (error.name === 'TokenExpiredError') { // 유효기간 초과
            return res.status(419).json({
                code: 419,
                message: '토큰이 만료되었습니다.'
            });
        }
        return res.status(401).json({
            code: 401,
            message: '유효하지 않은 토큰입니다.'
        });
    }
}