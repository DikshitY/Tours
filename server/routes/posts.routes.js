import express from 'express';
import { getPosts } from '../controllers/postsController';

const router = express.Router();

router.route('/').get(getPosts);

export default router;
