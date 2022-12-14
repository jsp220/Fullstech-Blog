const router = require('express').Router();
const { Post, Comment, User } = require ('../models/');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [{
                model: User, 
                attributes: { exclude: ['password'] }
            }]
        });

        const posts = postData.map((post) => post.get({ plain: true }));

        // const posts = plainData.map((post) => {
        //     delete post.User.password;
        //     return post;
        // });

        // console.log(posts);
        res.render('all-posts', { 
            posts,
            logged_in: req.session.logged_in 
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/post/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                {model: User, attributes: {exclude: ['password']} }, 
                {model: Comment, include: [
                    {model: User, attributes: {exclude: ['password']} }
                ]}
            ]
        });

        const post = postData.get({ plain: true });

        res.render('single-post', { post, logged_in: req.session.logged_in });
        // res.json(post);
    } catch (err) {
        res.status(500).json(err);
    }
})
 
router.get('/login', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
      res.redirect('/');
      return;
    }
  
    res.render('login', {logged_in: req.session.logged_in});
  });

// router.get('*', (req, res) => {
//     res.redirect('/');
// })

module.exports = router;