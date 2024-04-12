import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Layout from './components/Layout/Layout';
import {useSelector, useDispatch} from 'react-redux'
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import PostDetail from './components/PostDetail';
import { useEffect } from 'react';
import { setAuth } from './store';

function App() {
  const user = useSelector(state => state?.auth?.authData)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setAuth())
  },[])

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Navigate to="/posts" />} />
            <Route path="/posts" element={<HomePage />} />
            <Route path="/posts/search" element={<HomePage />} />
            <Route path="/posts/:id" element={<PostDetail />} />
            <Route path="/auth" element={!user ? <AuthPage /> : <Navigate to="/posts" />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;
