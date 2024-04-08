import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Layout from './components/Layout/Layout';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import PostDetail from './components/PostDetail';

function App() {
  const user = JSON.parse(localStorage.getItem('profile'));

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Navigate to="posts" />} />
            <Route path="posts" element={<HomePage />} />
            <Route path="posts/search" element={<HomePage />} />
            <Route path="posts/:id" element={<PostDetail />} />
            <Route path="auth" element={!user ? <AuthPage /> : <Navigate to="/posts" />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;
