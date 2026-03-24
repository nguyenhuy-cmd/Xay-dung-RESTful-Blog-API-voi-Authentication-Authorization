const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const { protect, authorization } = require('../middlewares/auth');

router.get('/', postController.getAllPosts); // Public
router.post('/', protect, postController.createPost); // Phải login
router.delete('/:id', protect, postController.deletePost); // Login + Logic Author/Admin trong controller

module.exports = router;