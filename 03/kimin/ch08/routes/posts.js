const express = require('express');
const Post = require('../schemas/post');

const router = express.Router();

router.post('/', async (req, res, next) => {
    try {
        const post = await Post.create({
            user_id: req.body.id,
            title: req.body.title,
            body: req.body.body,
        });
        const result = await Post.populate(post, { path: 'user_id' });
        res.status(201).json(result);
    } catch (error) {
        console.error(error);
        next(error);
    }
});

router.route('/:id')
.patch(async (req, res, next) => {
    try {
        const result = await Post.update({
            _id: req.params.id
        }, {
            title: req.body.title,
            body: req.body.body,
        });
        res.json(result);
    } catch (error) {
        console.error(error);
        next(error);
    }
})
.delete(async (req, res, next) => {
    try {
        const result = await Post.remove({
            _id: req.params.id
        });
        res.json(result);
    } catch (error) {
        console.error(error);
        next(error);
    }
});

module.exports = router;