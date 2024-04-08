import React, { useEffect, useState } from 'react';
import tours from '../../assets/images/tours.png';
import { AppBar, Typography, Box, Toolbar, Avatar, Button } from '@mui/material';
import { deepPurple } from '@mui/material/colors';
import useTheme from '@mui/material/styles/useTheme';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { googleLogout } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import { logOutAuth } from '../../store';

const Navbar = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

  const handleLogout = () => {
    googleLogout();
    setUser(null);
    dispatch(logOutAuth());
    navigate('/posts');
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
      // Check if token is expired
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
      // sx={{
      //   borderRadius: 5,
      //   marginBottom: '30px',
      //   display: 'flex',
      //   flexDirection: 'row',
      //   justifyContent: 'space-between',
      //   alignItems: 'center',
      // }}
      sx={{
        borderRadius: 5,
        marginBottom: '30px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '5px 20px',
        [theme.breakpoints.down('sm')]: {
          flexDirection: 'column',
        },
      }}
    >
      <Box sx={{ display: 'flex', marginLeft: '10px', alignItems: 'center' }}>
        <Link to={'/'}>
          <Typography
            to="/"
            variant="h3"
            align="center"
            sx={{
              color: 'rgba(0,183,255, 1)',
            }}
            // sx={{
            //   color: theme.palette.primary.main,
            //   textDecoration: 'none',
            //   fontSize: '2em',
            //   fontWeight: 300,
            // }}
          >
            Tours
          </Typography>
        </Link>
        <img
          src={tours}
          alt="tours logo"
          height="50"
          sx={{
            marginLeft: '15px',
          }}
        />
      </Box>
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          width: '400px',
          [theme.breakpoints.down('sm')]: {
            width: 'auto',
          },
        }}
      >
        {user ? (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '400px',
              alignItems: 'center',
              [theme.breakpoints.down('sm')]: {
                width: 'auto',
                marginTop: 20,
                justifyContent: 'center',
              },
            }}
          >
            <Avatar
              sx={{
                color: theme.palette.getContrastText(deepPurple[500]),
                backgroundColor: deepPurple[500],
              }}
              src={user.result.picture}
              alt={user.result.name}
            >
              {user.result.name.charAt(0)}
            </Avatar>
            <Typography
              sx={{
                display: 'flex',
                alignItems: 'center',
                textAlign: 'center',
              }}
              variant="h6"
            >
              {user.result.name}
            </Typography>
            <Button sx={{ marginLeft: '20px' }} variant="contained" color="secondary" onClick={handleLogout}>
              Logout
            </Button>
          </Box>
        ) : (
          <Link to={'/auth'}>
            <Button variant="contained" color="primary">
              Sign In
            </Button>
          </Link>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
