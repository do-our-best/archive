const express = require('express');
const User = require('../schemas/user');
const Post = require('../schemas/post');

const router = express.Router();

router.route('/')
.get(async (req, res, next) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (err) {
        console.error(err);
        next(err);
    }
})
.post(async (req, res, next) => {
    try {
        const user = await User.create({
            name: req.body.name,
            age: req.body.age,
            info: req.body.info,
        });
        console.log(user);
        res.status(201).json(user);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

router.get('/:id/posts', async (req, res, next) => {
    try {
        const posts = await Post.find({
            user_id: req.params.id,
        }).populate('user_id');
        console.log(posts);
        res.json(posts);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

module.exports = router;