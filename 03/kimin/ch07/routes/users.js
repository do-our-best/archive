const express = require('express');
const { User, Post } = require('../models');

const router = express.Router();

router.route('/')
.get(async (req, res, next) => {
    try {
        const users = await User.findAll();
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
        const posts = await Post.findAll({
           include: {
               model: User,
               where: {
                   id: req.params.id,
               },
           },
        });
        console.log(posts);
        res.json(posts);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

module.exports = router;