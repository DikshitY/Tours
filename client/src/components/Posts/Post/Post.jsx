import React, { useState } from 'react';
import moment from 'moment';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, Box, ButtonBase } from '@mui/material';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbUpAltOutlined from '@mui/icons-material/ThumbUpAltOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { deletePost, likePost } from '../../../store';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Post = ({ post, setCurrentID }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('profile'));
  const [likes, setLikes] = useState(post?.likes);
  const userID = user?.result?.sub || user?.result?._id;
  const hasLikedPost = post?.likes.find((like) => like === userID);

  const handleLike = () => {
    dispatch(likePost(post._id));
    if (hasLikedPost) {
      setLikes(post.likes.filter((id) => id !== userID));
    } else {
      setLikes([...post.likes, userID]);
    }
  };

  const openPost = () => {
    navigate(`${post._id}`);
  };

  const Likes = () => {
    if (likes.length > 0) {
      return likes.find((like) => like === userID) ? (
        <>
          <ThumbUpAltIcon fontSize="small" />
          &nbsp;
          {likes.length > 2
            ? `You and ${likes.length - 1} others`
            : `${likes.length} like${likes.length > 1 ? 's' : ''}`}
        </>
      ) : (
        <>
          <ThumbUpAltOutlined fontSize="small" />
          &nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}
        </>
      );
    }

    return (
      <>
        <ThumbUpAltOutlined fontSize="small" />
        &nbsp;Like
      </>
    );
  };

  return (
    <Card
      sx={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderRadius: '15px',
        height: '100%',
      }}
      raised
      elevation={2}
    >
      <ButtonBase
        sx={{
          display: 'block',
          textAlign: 'initial',
        }}
        onClick={openPost}
      >
        <CardMedia
          sx={{
            height: 0,
            paddingTop: '56.25%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            backgroundBlendMode: 'darken',
          }}
          src="post_image"
          image={post.selectedFile}
          title={post.title}
        />
        <Box sx={{ position: 'absolute', top: '20px', left: '20px', color: 'white' }}>
          <Typography variant="h6">{post.name}</Typography>
          <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
        </Box>
        {(user?.result?.sub === post?.creator || user?.result?._id === post?.creator) && (
          <Box
            sx={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              color: 'white',
            }}
          >
            <Button
              style={{ color: 'white' }}
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                setCurrentID(post._id);
              }}
            >
              <MoreHorizIcon fontSize="default" />
            </Button>
          </Box>
        )}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            margin: '20px',
          }}
        >
          <Typography variant="body2" color="textSecondary">
            {post.tags.map((tag) => `#${tag} `)}
          </Typography>
        </Box>
        <Typography
          sx={{
            padding: '0 16px',
          }}
          variant="h5"
          gutterBottom
        >
          {post.title}
        </Typography>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {post.message}
          </Typography>
        </CardContent>
      </ButtonBase>
      <CardActions
        sx={{
          padding: '0 16px 8px 16px',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Button size="small" color="primary" disabled={!user?.result} onClick={handleLike}>
          <Likes />
        </Button>
        {(user?.result?.sub === post?.creator || user?.result?._id === post?.creator) && (
          <Button size="small" color="primary" onClick={() => dispatch(deletePost(post))}>
            <DeleteIcon fontSize="small" />
            Delete
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default Post;
