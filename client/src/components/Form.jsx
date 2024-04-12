import React, { useState, useEffect } from 'react';
import { TextField, Paper, Typography, Button, CircularProgress } from '@mui/material';
// import FileBase from 'react-file-base64';
import { addPost, updatePost } from '../store';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Form = ({ currentID, setCurrentID }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const post = useSelector((state) => (currentID ? state.posts.posts.find((p) => p._id === currentID) : null));
  const user = useSelector(state => state?.auth?.authData);
  const {isPostLoading} = useSelector(state => state.posts)

  const [postData, setPostData] = useState({
    title: '',
    message: '',
    tags: [],
    selectedFile: null,
  });

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (postData.title === '' || postData.message === '' || postData.tags === '' || postData.selectedFile === null) {
      toast.error('Enter every field.');
      return;
    }

    const formData = new FormData();
    formData.append('name', user?.result?.name);
    formData.append('creator', user?.result?._id)
    formData.append('title', postData.title);
    formData.append('message', postData.message);
    postData.tags.forEach((tag) => {
      formData.append('tags', tag);
    });
    formData.append('selectedFile', postData.selectedFile);

    console.log(formData);

    if (currentID) {
      dispatch(updatePost({ currentID, formData }));
    } else {
      dispatch(addPost({ formData, navigate }));
    }
    clear();
  };

  const clear = () => {
    setCurrentID(null);
    setPostData({
      title: '',
      message: '',
      tags: '',
      selectedFile: null,
    });
  };

  if (!user?.result?.name) {
    return (
      <Paper sx={{ padding: (theme) => theme.spacing(2) }}>
        <Typography variant="h6" align="center">
          Please Sign In to create your own memories and like other's memory.
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper sx={{ padding: (theme) => theme.spacing(2) }} elevation={6}>
      <form
        autoComplete="off"
        noValidate
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">{currentID ? 'Editing' : 'Creating'} a Tour's Memory</Typography>
        <TextField
          required
          sx={{ marginY: (theme) => theme.spacing(1) }}
          name="title"
          label="Title"
          variant="outlined"
          fullWidth
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />
        <TextField
          required
          multiline
          sx={{ marginY: (theme) => theme.spacing(1) }}
          name="message"
          label="Message"
          variant="outlined"
          fullWidth
          value={postData.message}
          onChange={(e) => setPostData({ ...postData, message: e.target.value })}
        />
        <TextField
          required
          sx={{ marginY: (theme) => theme.spacing(1) }}
          name="tags"
          label="Tags"
          variant="outlined"
          fullWidth
          value={postData.tags}
          onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })}
        />
        <input
          required
          type="file"
          accept="image/*"
          name="selectedFile"
          onChange={(e) => setPostData({ ...postData, selectedFile: e.target.files[0] })}
        />
        {/* <div>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })}
          />
        </div> */}
        <Button
          sx={{
            marginY: '10px',
          }}
          variant="contained"
          size="large"
          color="primary"
          type="submit"
          fullWidth
          disabled={isPostLoading}
        >
          {isPostLoading ? <CircularProgress color='secondary'/> : 'Submit'}
        </Button>
        <Button variant="contained" size="small" color="secondary" fullWidth onClick={clear}>
          CLear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
