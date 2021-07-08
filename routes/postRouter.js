const express = require('express');
const app = require('../app');
const authController = require('../controllers/authController');
const postController = require('../controllers/postController');

const router = express.Router();

router
  .route('/')
  .get(postController.getPost)
  .post(authController.protect, postController.addPost);

router.route('/:slug').get(postController.getPostBySlug);

router
  .route('/:id')
  .patch(authController.protect, postController.updatePostById)
  .delete(authController.protect, postController.deletePostById);

module.exports = router;
