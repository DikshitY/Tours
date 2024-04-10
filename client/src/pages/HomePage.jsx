import React, { useState } from 'react';
import { Container, Grow, Grid, Paper, AppBar, TextField, Button, Chip } from '@mui/material';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Form from '../components/Form';
import Posts from '../components/Posts/Posts';
import Paginate from '../components/Pagination';
import { Box } from '@mui/system';
import { fetchPostsBySearch } from '../store';

const HomePage = () => {
  const dispatch = useDispatch();
  const [currentID, setCurrentID] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const page = searchParams.get('page') || 1;
  const searchQuery = searchParams.get('searchQuery');
  const [searchTerm, setSearchTerm] = useState('');
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');

  const searchPost = () => {
    if (searchTerm.trim() || tags.length > 0) {
      dispatch(fetchPostsBySearch({ searchTerm, tags: tags.join(',') }));
      // setSearchParams({ searchQuery: searchTerm || 'none', tags: tags.join(',') || 'none' });
    } else {
      navigate('/');
    }
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      searchPost();
    }
  };

  const handleDelete = (tagToDelete) => {
    setTags((tags) => tags.filter((tag) => tag !== tagToDelete));
  };

  const handleAdd = (e) => {
    if (e.keyCode === 13 && tagInput.trim() !== '') {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  return (
    <Grow in>
      <Container maxWidth="xl" sx={{marginBottom:'15px'}}>
        <Grid
          sx={{
            flexDirection: {
              xs: 'column-reverse',
              sm: 'row',
            },
          }}
          container
          justifyContent={'space-between'}
          alignItems={'stretch'}
          spacing={3}
        >
          <Grid item xs={12} sm={6} md={9}>
            <Posts setCurrentID={setCurrentID} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBar
              position="static"
              color="inherit"
              sx={{
                borderRadius: 4,
                marginBottom: '1rem',
                display: 'flex',
                padding: '16px',
              }}
            >
              <TextField
                fullWidth
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyDown}
                name="search"
                label="Search Tours"
                variant="outlined"
              />
              <Box sx={{ marginTop: '10px' }}>
                <TextField
                  label="Search Tags"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleAdd}
                  fullWidth
                />
                <Box mt={1}>
                  {tags.map((tag, index) => (
                    <Chip
                      key={index}
                      label={tag}
                      onDelete={() => handleDelete(tag)}
                      sx={{ margin: '4px 4px 10px 4px' }}
                    />
                  ))}
                </Box>
              </Box>
              <Button onClick={searchPost} color="primary" variant="contained">
                Search
              </Button>
            </AppBar>
            <Form currentID={currentID} setCurrentID={setCurrentID} />
            {!searchQuery && !tags.length && (
              <Paper
                sx={{
                  borderRadius: 4,
                  marginTop: '1rem',
                  padding: '16px 10px',
                }}
                elevation={6}
              >
                <Paginate page={page} />
              </Paper>
            )}
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default HomePage;
