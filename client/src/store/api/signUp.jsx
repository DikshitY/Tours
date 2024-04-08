import { createAsyncThunk } from '@reduxjs/toolkit';
import Axios from '../../Axios';

const signUp = createAsyncThunk('user/signUp', async (formData) => {
  try {
    const { data } = await Axios.post('/api/v1/users/signup', formData);

    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
});

export { signUp };
