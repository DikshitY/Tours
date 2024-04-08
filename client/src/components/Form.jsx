import React, { useState, useEffect } from 'react';
import { TextField, Paper, Typography, Button } from '@mui/material';
import FileBase from 'react-file-base64';
import { addPost, updatePost } from '../store';
import { useDispatch, useSelector } from 'react-redux';
import {useNavigate} from 'react-router-dom'

const Form = ({ currentID, setCurrentID }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const post = useSelector((state) =>
    currentID ? state.posts.posts.find((p) => p._id === currentID) : null
  );
  const user = JSON.parse(localStorage.getItem('profile'))

  const [postData, setPostData] = useState({
    title: '',
    message: '',
    tags: '',
    selectedFile: null,
  });

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = {...postData, name: user?.result?.name}

    if (currentID) {
      console.log(formData);
      dispatch(updatePost({ currentID, formData }));
    } else {
      dispatch(addPost({formData, navigate}));
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

  if(!user?.result?.name){
    return (
      <Paper sx={{ padding: (theme) => theme.spacing(2) }}>
        <Typography variant='h6' align='center'>
            Please Sign In to create your own memories and like other's memory.
        </Typography>
      </Paper>
    )
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
        <Typography variant="h6">
          {currentID ? 'Editing' : 'Creating'} a Tour's Memory
        </Typography>
        <TextField
          sx={{ marginY: (theme) => theme.spacing(1) }}
          name="title"
          label="Title"
          variant="outlined"
          fullWidth
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />
        <TextField
          sx={{ marginY: (theme) => theme.spacing(1) }}
          name="message"
          label="Message"
          variant="outlined"
          fullWidth
          value={postData.message}
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
        />
        <TextField
          sx={{ marginY: (theme) => theme.spacing(1) }}
          name="tags"
          label="Tags"
          variant="outlined"
          fullWidth
          value={postData.tags}
          onChange={(e) =>
            setPostData({ ...postData, tags: e.target.value.split(',') })
          }
        />
        <div>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          />
        </div>
        <Button
          sx={{
            marginY: '10px',
          }}
          variant="contained"
          size="large"
          color="primary"
          type="submit"
          fullWidth
        >
          Submit
        </Button>
        <Button
          variant="contained"
          size="small"
          color="secondary"
          fullWidth
          onClick={clear}
        >
          CLear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
