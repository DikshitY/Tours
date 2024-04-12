import React, { useState } from 'react';
import { Typography, TextField, Button, Box, CircularProgress } from '@mui/material';
import { useDispatch } from 'react-redux';
import { commentPost } from '../store';
import useTheme from '@mui/material/styles/useTheme';

const CommentSection = ({ post, isCommentLoading}) => {
  const dispatch = useDispatch();
  // const commentsRef = useRef();
  const theme = useTheme();
  const user = JSON.parse(localStorage.getItem('profile'))?.result;
  const [comments, setComments] = useState(post?.comments);
  const [comment, setComment] = useState('');

  // useEffect(() => {
  //   if (commentsRef.current) {
  //     // commentsRef.current.scrollIntoView({ behavior: 'smooth' });
  //   }
  // }, [comments]);

  const handleClick = async () => {
    const finalComment = `${user?.name}: ${comment}`;

    const { payload } = await dispatch(commentPost({ finalComment, postID: post._id }));
    setComment('');
    setComments(payload.comments);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        marginTop:'10px',
        [theme.breakpoints.down('sm')]: {
          flexWrap: 'wrap',
          flexDirection: 'column',
        },
      }}
    >
      <Box
        sx={{
          height: '200px',
          overflowY: 'auto',
          width: '50%',
          [theme.breakpoints.down('sm')]: {
            width: '100%',
            marginRight:'0px'
          },
        }}
      >
        <Typography gutterBottom variant="h6">
          Comments
        </Typography>
        {comments.length ? (
          comments.map((c, i) => (
            <Typography gutterBottom variant="subtitle1" key={i}>
              <strong>{c.split(': ')[0]}</strong>
              {c.split(':')[1]}
            </Typography>
          ))
        ) : (
          <Typography variant="body1" sx={{ marginTop: '10px' }}>
            Be the first one to comment.
          </Typography>
        )}
        <div />
      </Box>
      {user && (
        <Box
          sx={{
            width: '50%',
            [theme.breakpoints.down('sm')]: {
              width: '100%',
            },
          }}
        >
          <Typography gutterBottom variant="h6">
            Write a Comment
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            rows={4}
            label="Comment"
            multiline
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <Button
            style={{ marginTop: '10px' }}
            fullWidth
            disabled={!comment || isCommentLoading}
            variant="contained"
            onClick={handleClick}
            color="primary"
          >
            {isCommentLoading ? <CircularProgress color='secondary'/> : 'Comment'}
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default CommentSection;
