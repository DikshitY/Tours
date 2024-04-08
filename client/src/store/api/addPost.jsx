import { createAsyncThunk } from '@reduxjs/toolkit';
import Axios from '../../Axios';

const addPost = createAsyncThunk('post/add', async ({formData, navigate}) => {
  try {
    const {data} = await Axios.post('/api/v1/posts', formData);
    console.log(data);
    navigate(`/posts/${data._id}`)
    return data;
  } catch (error) {
    console.log(error.message);
  }
});

export { addPost };
