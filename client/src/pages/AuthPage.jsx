import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addAuth, signIn, signUp } from '../store';
import { useGoogleLogin } from '@react-oauth/google';
import useTheme from '@mui/material/styles/useTheme';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Avatar, Button, Grid, Paper, Typography, Container } from '@mui/material';
import Input from '../components/reusable/Input';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Icon from '../assets/svgs/Icon';

const SignInPage = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleShowPassword = () => setShowPassword((prev) => !prev);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignup) {
      dispatch(signUp({formData, navigate}));
      // navigate('/');
    } else {
      dispatch(signIn({ formData, navigate }));
      // navigate('/')
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      try {
        const res = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: { Authorization: `Bearer ${codeResponse.access_token}` },
        });
        const token = codeResponse.access_token;
        const result = res.data;
        dispatch(addAuth({ result, token }));
        navigate('/');
      } catch (error) {
        console.log(error);
      }
    },
    onError: () => console.log('Please try again.'),
  });

  const switchMode = () => {
    setIsSignup((prev) => !prev);
    setShowPassword(false);
  };

  return (
    <Container component={'main'} maxWidth="xs">
      <Paper
        elevation={3}
        sx={{
          marginTop: theme.spacing(4),
          marginBottom: theme.spacing(2),
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: (theme) => theme.spacing(2),
        }}
      >
        <Avatar
          sx={{
            // margin: theme.spacing(1),
            backgroundColor: theme.palette.secondary.main,
          }}
        >
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5" marginBottom={2}>
          {isSignup ? 'Sign Up' : 'Sign In'}
        </Typography>
        <form
          sx={{
            width: '100%',
            marginTop: theme.spacing(3),
          }}
          onSubmit={handleSubmit}
        >
          <Grid spacing={2} container>
            {isSignup && (
              <>
                <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                <Input name="lastName" label="Last Name" handleChange={handleChange} half />
              </>
            )}
            <Input name="email" label="Email Address" type="email" handleChange={handleChange} />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? 'text' : 'password'}
              handleShowPassword={handleShowPassword}
            />
            {isSignup && (
              <Input
                name="confirmPassword"
                label="Confirm Password"
                handleChange={handleChange}
                type={'password'}
              />
            )}
          </Grid>
          <Button
            color="primary"
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              margin: theme.spacing(3, 0, 2),
            }}
          >
            {isSignup ? 'Sign Up' : 'Sign In'}
          </Button>
          <Button
            sx={{
              marginBottom: theme.spacing(2),
            }}
            onClick={handleLogin}
            color="primary"
            variant="contained"
            fullWidth
            startIcon={<Icon />}
          >
            Google Sign In
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignup ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default SignInPage;
