import React from 'react';
import { useSelector } from 'react-redux';
import { Grid, CircularProgress, Box } from '@mui/material';
import Post from './Post/Post';

const Posts = ({ setCurrentID }) => {
  const {posts, isLoading} = useSelector((state) => state.posts);
  
  if(!posts.length && !isLoading) return 'No Posts!'

  return isLoading ? (
    <Box sx={{display: 'flex', justifyContent:'center', alignItems:'center', height:'100%'}}><CircularProgress /></Box>
  ) : (
    <Grid container alignItems={'stretch'} spacing={3} sx={{ display: 'flex' }}>
      {posts.map((post) => (
        <Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
          <Post post={post} setCurrentID={setCurrentID} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Posts;
