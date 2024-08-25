const express = require('express');
const router = express.Router();
const BlogController = require('../controllers/BlogController');

router.get('/blogs', BlogController.getAllBlogs);
router.get('/blog/:id', BlogController.getBlogById);
router.post('/blog', BlogController.createBlog);
router.put('/updateBlog/:id', BlogController.updateBlog);
router.delete('/deleteBlog/:id', BlogController.deleteBlog);

module.exports = router;

