import { createAsyncThunk } from '@reduxjs/toolkit';
import Axios from '../../Axios';

const commentPost = createAsyncThunk('comment/post', async ({ finalComment, postID }) => {
  try {
    const { data } = await Axios.post(`/api/v1/posts/${postID}/commentPost`, { finalComment });

    return data;
  } catch (error) {
    console.log(error.message);
  }
});

export { commentPost };
