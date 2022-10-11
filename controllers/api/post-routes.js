const router = require('express').Router();
const { User, Post } = require('../../models');

router.post('/', async (req, res) => {
    try {
        const newPost = await Post.create( {
            ...req.body,
            userId: req.session.user_id,
        });

        res.status(200).json(newPost);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.put('/:id', async (req, res) => {
    try {
        const updatePost = await Post.update( 
            {
                ...req.body,
                userId: req.session.user_id,
            },
            {
                where: {
                    id: req.params.id
                }
            });

        res.status(200).json(updatePost);
    } catch (err) {
        res.status(400).json(err);
    }
});


module.exports = router;