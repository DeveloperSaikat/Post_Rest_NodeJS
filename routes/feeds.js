const express = require('express');
const { body } = require('express-validator');

const feedController = require('../controllers/feeds');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

//GET /feed/posts
router.get('/posts', isAuth, feedController.getPosts);

//POST /feed/post
router.post('/post', 
isAuth,
[body('title').trim().isLength({min: 5}),
body('content').trim().isLength({min: 5})],
feedController.createPost);

//GET a single post
router.get('/post/:postId', isAuth, feedController.getPost);

//UPDATE a post
router.put('/post/:postId', isAuth,
[body('title').trim().isLength({min: 5}),
body('content').trim().isLength({min: 5})],
feedController.updatePost);

//DELETE a post 
router.delete('/post/:postId',isAuth , feedController.deletePost);

module.exports = router;