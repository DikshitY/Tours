import { createAsyncThunk } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import Axios from '../../Axios';

const signIn = createAsyncThunk('user/signin', async ({ formData, navigate }) => {
  try {
    const { data } = await Axios.post('/api/v1/users/signin', formData);

    navigate('/');
    toast.success("You've been Signed In.")
    return data;
  } catch (error) {
    if (!error.response.data.success) toast.error(error?.response?.data?.message);
    console.log(error);
  }
});

export { signIn };
