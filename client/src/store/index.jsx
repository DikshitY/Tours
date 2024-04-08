import { configureStore } from '@reduxjs/toolkit';
import { postsReducer } from './slices/postsSilce';
import { authReducer, addAuth, logOutAuth} from './slices/authSlice';

const store = configureStore({
  reducer: {
    posts: postsReducer,
    auth: authReducer,
  },
});

export { store, addAuth, logOutAuth };
export * from './api/fetchPost'
export * from './api/fetchPosts';
export * from './api/fetchPostsBySearch'
export * from './api/addPost';
export * from './api/updatePost';
export * from './api/deletePost';
export * from './api/likePost';
export * from './api/signIn'
export * from './api/signUp'
export * from './api/commentPost'