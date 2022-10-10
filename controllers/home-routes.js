const router = require('express').Router();
const { Post, Comment, User } = require ('../models/');

router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [User]
        });
        const plainData = postData.map((post) => post.get({ plain: true }));

        const posts = plainData.map((post) => {
            delete post.User.password;
            return post;
        });

        console.log(posts);
        res.render('all-posts', { posts });
        // res.json(posts);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/post/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                {model: User}, 
                {model: Comment, include: [
                    {model: User}
                ]}
            ]
        });

        const post = postData.get({ plain: true });

        delete post.User.password;

        console.log(post);
        res.render('single-post', { post });
        // res.json(post);
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;