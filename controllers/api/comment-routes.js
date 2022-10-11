const router = require('express').Router();
const { User, Comment } = require('../../models');

router.post('/', async (req, res) => {
    
    
    try {
        console.log(req.body);
        
        const newPost = await Comment.create( {
            ...req.body,
            userId: req.session.user_id
        });

        console.log(newPost);

        res.status(200).json(newPost);
    } catch (err) {
        res.status(400).json(err);
    }
});


module.exports = router;