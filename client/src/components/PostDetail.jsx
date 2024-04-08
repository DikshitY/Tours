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
  const { post, posts, isLoading } = useSelector((state) => state.posts);
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
    <Paper elevation={6} sx={{ padding: '20px', borderRadius: '15px' }}>
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          [theme.breakpoints.down('sm')]: {
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
            {post.title}
          </Typography>
          <Typography gutterBottom variant="h6" color="textSecondary" component="h2">
            {post.tags.map((tag) => `#${tag} `)}
          </Typography>
          <Typography gutterBottom variant="body1" component="p">
            {post.message}
          </Typography>
          <Typography variant="h6">Created by: {post.name}</Typography>
          <Typography variant="body1">{moment(post.createdAt).fromNow()}</Typography>
          <Divider sx={{ margin: '20px 0' }} />
          <Typography variant="body1">
            <strong>Realtime Chat - coming soon!</strong>
          </Typography>
          <Divider sx={{ margin: '20px 0' }} />
          <CommentSection post={post}/>
          <Divider style={{ margin: '20px 0' }} />
        </Box>
        <Box
          sx={{
            marginLeft: '20px',
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
              maxHeight: '600px',
            }}
            src={
              post.selectedFile ||
              'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'
            }
            alt={post.title}
          />
        </Box>
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
              [theme.breakpoints.down('sm')]: {
                flexDirection: 'column',
              },
            }}
          >
            {recommendedPosts.map(({ title, likes, name, _id, selectedFile, message }) => (
              <div style={{ margin: '20px', cursor: 'pointer' }} key={_id} onClick={() => openPost(_id)}>
                <Typography gutterBottom variant='h6'>{title}</Typography>
                <Typography gutterBottom variant='subtitle2'>{name}</Typography>
                <Typography gutterBottom variant='subtitle2'>{message}</Typography>
                <Typography gutterBottom variant='subtitle1'>Likes: {likes.length}</Typography>
                <img src={selectedFile} width='200px'/>
              </div>
            ))}
          </Box>
        </Box>
      )}
    </Paper>
  );
};

export default PostDetail;
