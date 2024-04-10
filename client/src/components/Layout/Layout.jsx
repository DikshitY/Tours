import React from 'react';
import { Outlet } from 'react-router-dom';
import { Container } from '@mui/material';
import {Toaster} from 'react-hot-toast'
import Navbar from './Navbar';

const Layout = () => {
  return (
    <Container maxWidth="xl" sx={{ padding: '15px 15px 0px 15px' }}>
      <Toaster/>
      <Navbar />
      <Outlet />
    </Container>
  );
};

export default Layout;
