const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const { protect, authorization, isOwnerOrAdmin } = require('../middlewares/auth');
const upload  = require('../middlewares/upload');

router.get('/', postController.getAllPosts); // Public
router.get('/:id', postController.getPostById); // Public - Lấy 1 bài viết
router.post('/', protect, upload.single('image'), postController.createPost); // Phải login
router.put('/:id', protect, isOwnerOrAdmin, upload.single('image'), postController.updatePost); // Login + kiểm tra quyền
router.delete('/:id', protect, isOwnerOrAdmin, postController.deletePost); // Login + kiểm tra quyền trước khi xóa


module.exports = router;