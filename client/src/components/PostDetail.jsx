import React, { useEffect } from 'react';
import moment from 'moment';
import { Paper, Typography, CircularProgress, Divider, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import useTheme from '@mui/material/styles/useTheme';
import { fetchPost, fetchPostsBySearch } from '../store';
import CommentSection from './CommentSection';

const PostDetail = () => {
  const theme = useTheme();
  const { post, posts, isLoading, isCommentLoading } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchPost(id));
  }, [id]);

  useEffect(() => {
    if (post) {
      dispatch(fetchPostsBySearch({ searchTerm: 'none', tags: post?.tags.join(',') }));
    }
  }, [post]);

  if (!post) return null;

  if (isLoading)
    return (
      <Paper
        elevation={6}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '20px',
          borderRadius: '15px',
          height: '39vh',
        }}
      >
        <CircularProgress size="7em" />
      </Paper>
    );

  const recommendedPosts = posts.filter(({ _id }) => _id !== post._id);

  const openPost = (_id) => {
    navigate(`/posts/${_id}`);
  };

  return (
    <Paper elevation={6} sx={{ padding: '20px', borderRadius: '15px', marginBottom:'10px' }}>
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          [theme.breakpoints.down('md')]: {
            flexWrap: 'wrap',
            flexDirection: 'column',
          },
        }}
      >
        <Box
          sx={{
            borderRadius: '20px',
            margin: '10px',
            flex: 1,
          }}
        >
          <Typography variant="h3" component="h2">
            {post.title.substring(0, 1).toUpperCase() + post.title.substring(1)}
          </Typography>
          <Typography gutterBottom variant="h6" color="textSecondary" component="h2">
            {post.tags.map((tag) => `#${tag} `)}
            {/* {post.tags[0].split(',').map((tag) => `#${tag} `)} */}
          </Typography>
          <Typography gutterBottom variant="body1" component="p">
            {post.message}
          </Typography>
          <Divider sx={{ margin: '20px 0' }} />
          <Typography variant="h6">Created by: {post.name}</Typography>
          <Typography variant="body1">{moment(post.createdAt).fromNow()}</Typography>
        </Box>
        <Box
          sx={{
            marginLeft: '20px',
            overflow:'hidden',
            [theme.breakpoints.down('sm')]: {
              marginLeft: 0,
            },
          }}
        >
          <img
            style={{
              borderRadius: '20px',
              objectFit: 'cover',
              width: '100%',
              maxHeight: '400px',
            }}
            src={
              post.selectedFile ||
              'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'
            }
            alt={post.title}
          />
        </Box>
      </Box>
      <Box sx={{width:'100%'}}>
        <CommentSection post={post} isCommentLoading={isCommentLoading} />
      </Box>
      {recommendedPosts.length > 0 && (
        <Box
          sx={{
            borderRadius: '20px',
            margin: '10px',
            flex: 1,
          }}
        >
          <Typography variant="h5" gutterBottom>
            You might also like:
          </Typography>
          <Divider />
          <Box
            sx={{
              display: 'flex',
              overflowX: 'auto',
            }}
          >
            {recommendedPosts.map(({ title, likes, name, _id, selectedFile, message }) => (
              <Paper
                elevation={2}
                style={{
                  width:'220px',
                  margin: '10px',
                  cursor: 'pointer',
                  padding: '10px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
                key={_id}
                onClick={() => openPost(_id)}
              >
                <Typography gutterBottom variant="subtitle2">
                  {title.substring(0, 1).toUpperCase() + title.substring(1)}
                </Typography>
                <Typography gutterBottom variant="body2">
                  {name}
                </Typography>
                <Typography gutterBottom variant="caption">
                  {message.substring(0, 50) + '...'}
                </Typography>
                <img src={selectedFile} height="200px" style={{objectFit:'cover', borderRadius: '10px', marginTop:'10px', marginBottom:'10px' }} />
                <Typography gutterBottom variant="caption">
                  Likes: {likes.length}
                </Typography>
              </Paper>
            ))}
          </Box>
        </Box>
      )}
    </Paper>
  );
};

export default PostDetail;
