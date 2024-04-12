import mongoose from 'mongoose';
import Post from '../models/postModel.js';
import cloudinary from '../utils/cloudinary.js';

const opts = {
  overwrite: true,
  invalidate: true,
  resource_type: 'auto',
};

export const getPosts = async (req, res) => {
  const { page } = req.query;

  try {
    const LIMIT = 8;
    const startIndex = (Number(page) - 1) * LIMIT;
    const total = await Post.countDocuments({});

    const posts = await Post.find().sort({ createdAt: -1 }).limit(LIMIT).skip(startIndex);

    res.status(200).json({ data: posts, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT) });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getPostsBySearch = async (req, res) => {
  const { searchQuery, tags } = req.query;

  try {
    const title = new RegExp(searchQuery, 'i');

    const posts = await Post.find({ $or: [{ title }, { tags: { $in: tags.split(',') } }] }).sort({createdAt:-1}).limit(8);

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.find({ _id: id });
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  const post = req.body;
  const file = req?.files?.selectedFile;
  try {
    cloudinary.uploader.upload(file.tempFilePath, opts, async (err, result) => {
      if (err) {
        return res.status(500).json({
          success: false,
          error: err.message,
        });
      }

      const newPost = await Post.create({
        ...post,
        selectedFile: result.url,
      });
      res.status(201).json(newPost);
    });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  const post = req.body;
  const file = req?.files?.selectedFile;

  try {
    if (!mongoose.Types.ObjectId.isValid(_id))
      return res.status(404).json({ success: 'false', message: 'No post with that Id.' });

    if (file) {
      cloudinary.uploader.upload(file.tempFilePath, opts, async (err, result) => {
        if (err) {
          return res.status(500).json({
            success: false,
            error: err.message,
          });
        }

        const updatedPost = await Post.findByIdAndUpdate(_id, { ...post, selectedFile: result.url }, { new: true });
        return res.status(200).json(updatedPost);
      });
    } else {
      const updatedPost = await Post.findByIdAndUpdate(_id, post, { new: true });
      return res.status(200).json(updatedPost);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deletePost = async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).json({ success: 'false', message: 'No post with that Id.' });

    const deletedPost = await Post.findByIdAndDelete(id);
    res.status(200).json(deletedPost);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const likePost = async (req, res) => {
  const { id } = req.params;

  try {
    if (!req.userId) return res.status(401).json({ message: 'Please authenticate.' });

    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).json({ success: 'false', message: 'No post with that Id.' });

    const post = await Post.findById(id);

    const index = post.likes.findIndex((id) => id === req.userId);

    if (index === -1) {
      // like the post
      post.likes.push(req.userId);
    } else {
      // dislike the post
      post.likes = post.likes.filter((id) => id !== req.userId);
    }

    const likedPost = await Post.findByIdAndUpdate(id, post, { new: true });

    res.status(200).json(likedPost);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const commentPost = async (req, res) => {
  const { id } = req.params;
  const { finalComment } = req.body;
  try {
    const post = await Post.findById({ _id: id });

    if (!post) return res.status(404).json({ message: 'No post exist.' });

    post.comments.push(finalComment);

    const updatedPost = await Post.findByIdAndUpdate({ _id: id }, post, { new: true });

    res.status(201).json(updatedPost);
  } catch (error) {
    res.status(500).json(error.message);
  }
};
