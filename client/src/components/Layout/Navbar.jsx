import React, { useEffect, useState } from 'react';
import { AppBar, Typography, Box, Avatar, Button } from '@mui/material';
import { deepPurple } from '@mui/material/colors';
import useTheme from '@mui/material/styles/useTheme';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { googleLogout } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import toast from 'react-hot-toast'
import { logOutAuth } from '../../store';

const Navbar = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  console.log(user);

  const handleLogout = () => {
    googleLogout();
    setUser(null);
    dispatch(logOutAuth());
    navigate('/posts');
    toast.success("You've been logged out.")
  };

  useEffect(() => {
    const token = user?.token;
    const isCustomAuth = token?.length < 217;

    if (token && isCustomAuth) {
      const decodedToken = jwtDecode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) handleLogout();
    } else if (token) {
      verifyGoogleAccessToken(token);
    }

    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location]);

  async function verifyGoogleAccessToken(accessToken) {
    try {
      const response = await fetch(`https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=${accessToken}`);
      if (!response.ok) {
        throw new Error('Failed to verify token');
      }
      const data = await response.json();

      const currentTime = Math.floor(Date.now() / 1000);
      if (currentTime > data.exp) handleLogout();
    } catch (error) {
      console.error('Error verifying token:', error);
    }
  }

  return (
    <AppBar
      position="static"
      color="inherit"
      sx={{
        borderRadius: 3,
        marginBottom: '15px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 20px',
        [theme.breakpoints.down('sm')]: {
          padding: '10px',
        },
      }}
    >
      <Box sx={{ display: 'flex', marginLeft: '10px', alignItems: 'center' }}>
        <Link to={'/posts'}>
          <Typography
            to="/"
            variant="h3"
            align="center"
            sx={{
              color: 'rgba(0,140,255, 1)',
              fontSize: '2.5em',
              fontWeight: '600',
              [theme.breakpoints.down('sm')]: {
                fontSize: '1.5em',
              }
            }}
          >
            #Tours
          </Typography>
        </Link>
      </Box>
        {user ? (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Avatar
              sx={{
                color: theme.palette.getContrastText(deepPurple[500]),
                backgroundColor: deepPurple[500],
                [theme.breakpoints.down('sm')]: {
                  fontSize: '1em',
                  height:'30px',
                  width: '30px'
                }
              }}
              src={user.result.picture}
              alt={user.result.name}
            >
              {user.result.name.charAt(0)}
            </Avatar>
            <Button sx={{ marginLeft: '20px', [theme.breakpoints.down('sm')]: {
          fontSize: '0.7em',
        } }} variant="contained" color="secondary" onClick={handleLogout}>
              Logout
            </Button>
          </Box>
        ) : (
          <Link to={'/auth/'}>
            <Button
              variant="contained"
              color="primary"
              sx={{
                fontSize: '1em',
                [theme.breakpoints.down('sm')]: {
                  fontSize: '0.7em',
                },
              }}
            >
              Sign In
            </Button>
          </Link>
        )}
    </AppBar>
  );
};

export default Navbar;
