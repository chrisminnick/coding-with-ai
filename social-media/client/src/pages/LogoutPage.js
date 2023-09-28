import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout, setToken, setUser } from '../features/auth/authSlice';

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await dispatch(logout());
    dispatch(setToken(null));
    dispatch(setUser(null));
    localStorage.removeItem('token');
    navigate('/', { replace: true });
  };

  handleLogout();

  return <>Logout Page</>;
};

export default Logout;
