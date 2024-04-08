import React, { useState, useRef, useEffect } from 'react';
import { Typography, TextField, Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { commentPost } from '../store';

const CommentSection = ({ post }) => {
  const dispatch = useDispatch();
  const commentsRef = useRef();
  const user = JSON.parse(localStorage.getItem('profile'))?.result;
  const [comments, setComments] = useState(post?.comments);
  const [comment, setComment] = useState('');

  useEffect(() => {
    if (commentsRef.current) {
      commentsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [comments]);

  const handleClick = async () => {
    const finalComment = `${user?.name}: ${comment}`;

    const { payload } = await dispatch(commentPost({ finalComment, postID: post._id }));
    setComment('');
    setComments(payload.comments);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ height: '200px', overflowY: 'auto', marginRight: '30px', width: '50%' }}>
          <Typography gutterBottom variant="h6">
            Comments
          </Typography>
          {comments.map((c, i) => (
            <Typography gutterBottom variant="subtitle1" key={i}>
              <strong>{c.split(': ')[0]}</strong>{c.split(':')[1]}
            </Typography>
          ))}
          <div ref={commentsRef} />
        </div>
        {user && (
          <div style={{ width: '50%' }}>
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
              disabled={!comment}
              variant="contained"
              onClick={handleClick}
              color="primary"
            >
              Comment
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentSection;
