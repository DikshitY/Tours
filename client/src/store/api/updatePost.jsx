import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../Axios';

const updatePost = createAsyncThunk(
  'post/update',
  async ({ currentID, formData }) => {
    try {
      const response = await axios.patch(
        `/api/v1/posts/${currentID}`,
        formData
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error.message);
    }
  }
);

export { updatePost };
