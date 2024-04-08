import mongoose from 'mongoose';

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    name: {
      type: String
    },
    creator: {
      type: String,
    },
    tags: {
      type: [String],
    },
    selectedFile: {
      type: String,
    },
    likes: {
      type: [String],
      default: []
    },
    comments: {
      type: [String],
      default: []
    }
  },
  { timestamps: true }
);

const Post = mongoose.model('Post', postSchema);

export default Post;
