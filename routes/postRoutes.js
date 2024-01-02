const express = require('express');
const router = express.Router();

const isLoggedIn = require('../middleware/isLoggedIn');

const { createPost, updatePost, deletePost, getAllPosts } = require('../controller/postController');


router.route('/post/create').post(isLoggedIn, createPost);
router.route('/post/update/:id').put(isLoggedIn, updatePost);
router.route('/post/delete/:id').delete(isLoggedIn, deletePost);
router.route('/post').get(isLoggedIn, getAllPosts);

module.exports = router;