import React from 'react';
import { Outlet } from 'react-router-dom';
import { Container } from '@mui/material';
import Navbar from './Navbar';

const Layout = () => {
  return (
    <Container maxWidth="xl" sx={{ padding: '30px 0' }}>
      <Navbar />
      <Outlet/>
    </Container>
  );
};

export default Layout;
