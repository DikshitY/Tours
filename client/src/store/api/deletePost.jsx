import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../Axios';

const deletePost = createAsyncThunk('post/delete', async (post) => {
  const response = await axios.delete(`/api/v1/posts/${post._id}`);
  return post;
});

export { deletePost };
