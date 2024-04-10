import React, { useState } from 'react';
import moment from 'moment';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, Box, ButtonBase } from '@mui/material';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbUpAltOutlined from '@mui/icons-material/ThumbUpAltOutlined';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
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
  const [open, setOpen] = useState(false);
  const userID = user?.result?.sub || user?.result?._id;
  const hasLikedPost = post?.likes.find((like) => like === userID);

  const handleClose = () => {
    setOpen(false);
  };

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
          <Box
            onClick={(e) => {
              e.stopPropagation();
            }}
            sx={{
              position: 'absolute',
              display: open ? 'flex' : 'none',
              flexDirection: 'column',
              alignItems: 'flex-start',
              top: '10px',
              right: '10px',
              bgcolor: 'background.paper',
              borderRadius: '30px',
              boxShadow: 24,
              padding: '10px 50px 20px 10px',
            }}
          >
            <Button
              sx={{ fontWeight: '600', fontSize: '1em' }}
              onClick={() => {
                setCurrentID(post._id);
                handleClose();
              }}
            >
              <EditIcon sx={{ marginRight: '10px' }} /> Edit
            </Button>
            <Button
              sx={{ fontWeight: '600', fontSize: '1em' }}
              color="error"
              onClick={() => dispatch(deletePost(post))}
            >
              <DeleteIcon sx={{ marginRight: '10px' }} /> Delete
            </Button>
            <Button onClick={handleClose} sx={{ fontWeight: '600', fontSize: '1em' }} color="inherit">
              <CloseIcon sx={{ marginRight: '10px' }} /> Close
            </Button>
          </Box>
        {(user?.result?.sub === post?.creator || user?.result?._id === post?.creator) && (
          <Box
            sx={{
              position: 'absolute',
              top: '20px',
              right: '0px',
              color: 'white',
            }}
          >
            <Button
              style={{ color: 'white' }}
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                // setCurrentID(post._id);
                setOpen(true);
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
        {/* {(user?.result?.sub === post?.creator || user?.result?._id === post?.creator) && (
          <Button size="small" color="primary" onClick={() => dispatch(deletePost(post))}>
            <DeleteIcon fontSize="small" />
            Delete
          </Button>
        )} */}
      </CardActions>
      {/* <Modal
        open={open}
        onClose={handleClose}
      >
        <Box sx={style}>
          <Button
            sx={{ fontWeight: '600', fontSize: '1em' }}
            onClick={() => {
              setCurrentID(post._id);
              handleClose();
            }}
          >
            <EditIcon sx={{ marginRight: '10px' }} /> Edit
          </Button>
          <Button sx={{ fontWeight: '600', fontSize: '1em' }} color="error" onClick={() => dispatch(deletePost(post))}>
            <DeleteIcon sx={{ marginRight: '10px' }} /> Delete
          </Button>
          <Button onClick={handleClose} sx={{ fontWeight: '600', fontSize: '1em' }} color="inherit">
            <CloseIcon sx={{ marginRight: '10px' }} /> Close
          </Button>
        </Box>
      </Modal> */}
    </Card>
  );
};

export default Post;
