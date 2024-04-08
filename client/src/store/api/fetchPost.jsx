import { createAsyncThunk } from '@reduxjs/toolkit';
import Axios from '../../Axios';

const fetchPost = createAsyncThunk('post/fetch', async (id) => {
  const { data } = await Axios.get(`/api/v1/posts/${id}`);
  return data;
});

export { fetchPost };
