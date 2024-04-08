import { createAsyncThunk } from '@reduxjs/toolkit';
import Axios from '../../Axios';

const signIn = createAsyncThunk('user/signin', async ({formData, navigate}) => {
  try {
    
    const { data } = await Axios.post('/api/v1/users/signin', formData);

    console.log(data);
    navigate('/')
    return data;

  } catch (error) {
    console.log(error);
  }
});

export { signIn };
