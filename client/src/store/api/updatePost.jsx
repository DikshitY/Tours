import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../Axios';
import toast from 'react-hot-toast'

const updatePost = createAsyncThunk(
  'post/update',
  async ({ currentID, formData }) => {
    try {
      const response = await axios.patch(
        `/api/v1/posts/${currentID}`,
        formData
      );

      toast.success('Post updated successfully.')

      return response.data;
    } catch (error) {
      console.log(error.message);
    }
  }
);

export { updatePost };
