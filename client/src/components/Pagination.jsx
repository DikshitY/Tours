import React, { useEffect } from 'react';
import { Pagination, PaginationItem } from '@mui/material';
import { Link } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'
import { fetchPosts } from '../store';

const Paginate = ({page}) => {
  const dispatch = useDispatch()
  const {numberOfPages} = useSelector(state => state.posts)

  useEffect(() => {
    if(page) dispatch(fetchPosts(page))
  },[page])

  return (
    <Pagination
      sx={{ display:'flex', justifyContent: 'space-around' }}
      count={numberOfPages}
      page={Number(page) || 1}
      variant="outlined"
      color="primary"
      renderItem={item => (
        <Link to={`/posts?page=${item.page}`}>
            <PaginationItem {...item} />
        </Link>
      )}
    />
  );
};

export default Paginate;
