import { createAsyncThunk } from '@reduxjs/toolkit';
import Axios from '../../Axios';
import toast from 'react-hot-toast'

const addPost = createAsyncThunk('post/add', async ({formData, navigate}) => {
  try {
    const {data} = await Axios.post('/api/v1/posts', formData);

    navigate(`/posts/${data._id}`)
    toast.success('Post created successfully.')
    return data;
  } catch (error) {
    console.log(error.message);
  }
});

export { addPost };
