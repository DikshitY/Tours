import { createAsyncThunk } from '@reduxjs/toolkit';
import Axios from '../../Axios';
import toast from 'react-hot-toast'

const signUp = createAsyncThunk('user/signUp', async ({ formData, navigate }) => {
  try {
    const { data } = await Axios.post('/api/v1/users/signup', formData);

    navigate('/');
    toast.success("You've been Signed Up.")
    return data;
  } catch (error) {
    console.log(error);
    if (!error.response.data.success) {
      toast.error(error?.response?.data?.message);
    }
  }
});

export { signUp };
