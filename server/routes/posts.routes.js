import express from 'express';
import auth from '../middlewares/auth.js'
import {
  getPosts,
  getPostsBySearch,
  getPost,
  createPost,
  updatePost,
  deletePost,
  likePost,
  commentPost
} from '../controllers/postsController.js';

const router = express.Router();

router.route('/').get(getPosts).post(auth, createPost);
router.route('/search').get(getPostsBySearch)
router.route('/:id').patch(auth, updatePost).delete(auth, deletePost).get(getPost);
router.route('/:id/likePost').patch(auth, likePost);
router.route('/:id/commentPost').post(auth, commentPost);

export default router;
