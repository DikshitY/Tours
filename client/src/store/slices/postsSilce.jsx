import { createSlice } from '@reduxjs/toolkit';
import {
  addPost,
  updatePost,
  deletePost,
  likePost,
  fetchPosts,
  fetchPostsBySearch,
  fetchPost,
  commentPost,
} from '../index';

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    isLoading: false,
    isCommentLoading:false,
    isPostLoading:false,
  },
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchPosts.pending, (state, action) => {
      return { ...state, isLoading: true };
    });

    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      return {
        ...state,
        posts: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
        isLoading: false,
      };
    });

    builder.addCase(fetchPostsBySearch.pending, (state, action) => {
      return { ...state, isLoading: true };
    });

    builder.addCase(fetchPostsBySearch.fulfilled, (state, action) => {
      return { ...state, posts: action.payload, isLoading: false };
    });

    builder.addCase(fetchPost.pending, (state, action) => {
      return { ...state, isLoading: true };
    });

    builder.addCase(fetchPost.fulfilled, (state, action) => {
      return { ...state, isLoading: false, post: action.payload[0] };
    });

    builder.addCase(addPost.pending, (state, action) => {
      state.isPostLoading = true;
    });

    builder.addCase(addPost.fulfilled, (state, action) => {
      state.isPostLoading = false;
      state.posts.unshift(action.payload);
    });

    builder.addCase(updatePost.pending, (state, action) => {
      state.isPostLoading = true;
    });

    builder.addCase(updatePost.fulfilled, (state, action) => {
      return {
        ...state,
        isPostLoading: false,
        posts: state.posts.map((post) => (post._id === action.payload._id ? action.payload : post)),
      };
    });

    builder.addCase(deletePost.fulfilled, (state, action) => {
      return { ...state, posts: state.posts.filter((post) => post._id !== action.payload._id) };
    });

    builder.addCase(likePost.fulfilled, (state, action) => {
      return { ...state, posts: state.posts.map((post) => (post._id === action.payload._id ? action.payload : post)) };
    });

    builder.addCase(commentPost.pending, (state, action) => {
      state.isCommentLoading = true;
    });

    builder.addCase(commentPost.fulfilled, (state, action) => {
      return {
        ...state,
        isCommentLoading: false,
        posts: state.posts.map((post) => {
          if (post._id === action.payload._id) {
            return action.payload;
          } else {
            return post;
          }
        }),
      };
    });
  },
});

export const postsReducer = postsSlice.reducer;
export const {} = postsSlice.actions;
