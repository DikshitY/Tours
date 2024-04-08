import axios from '../../Axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const fetchPosts = createAsyncThunk('posts/fetch', async (page) => {
  try {
    const {data} = await axios.get(`/api/v1/posts?page=${page}`);
    return data;
  } catch (error) {
    console.log(error);
  }
});

export { fetchPosts };
