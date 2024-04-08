import { createAsyncThunk } from '@reduxjs/toolkit';
import Axios from '../../Axios';

const fetchPostsBySearch = createAsyncThunk('posts/fetchBySearch', async (searchQuery) => {
  try {
    const { data } = await Axios.get(
      `/api/v1/posts/search?searchQuery=${searchQuery.searchTerm || 'none'}&tags=${searchQuery.tags}`
    );

    return data;
  } catch (error) {
    console.log(error);
  }
});

export { fetchPostsBySearch };
