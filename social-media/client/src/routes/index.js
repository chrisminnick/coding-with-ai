import { Route, Routes as RouterRoutes } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoutes';

import LoginPage from '../pages/LoginPage';
import SignupPage from '../pages/SignupPage';
import LogoutPage from '../pages/LogoutPage';
import HomePage from '../pages/HomePage';
import PostsPage from '../pages/PostsPage';
import SinglePostPage from '../pages/SinglePostPage';

const Routes = () => {
  return (
    <RouterRoutes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/logout" element={<LogoutPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/posts" element={<ProtectedRoute />}>
        <Route path="/posts" element={<PostsPage />} />
        <Route path="/posts/:postId" element={<SinglePostPage />} />
      </Route>
    </RouterRoutes>
  );
};

export default Routes;
