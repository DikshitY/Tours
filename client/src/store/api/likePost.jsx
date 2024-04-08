import { createAsyncThunk } from '@reduxjs/toolkit';
import Axios from '../../Axios';

const likePost = createAsyncThunk('post/like', async (id) => {
  try {
    const response = await Axios.patch(`/api/v1/posts/${id}/likePost`);
    return response.data;
  } catch (error) {
    console.log(error.message);
  }
});

export { likePost };
