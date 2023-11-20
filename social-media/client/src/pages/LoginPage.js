import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login, setToken, setUser } from '../features/auth/authSlice';
import { useNavigate, Link } from 'react-router-dom';
import { throttle } from 'lodash';

function LoginPage() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginErr, setLoginErr] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = throttle(async (e) => {
    e.preventDefault();
    try {
      const data = await dispatch(login({ email, password }));
      localStorage.setItem('token', JSON.stringify(data.payload.accessToken));
      dispatch(setToken(data.payload.accessToken));
      dispatch(setUser(data.payload.userId));
      navigate('/posts', { replace: true });
    } catch (err) {
      setLoginErr(err.message);
    }
  }, 2000);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="card mt-5">
            <div className="card-header">
              <h4>Login</h4>
            </div>
            <div className="card-body">
              {loginErr && (
                <div className="alert alert-danger" role="alert">
                  {loginErr}
                </div>
              )}
              <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                  <label>Email</label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control"
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label>Password</label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control"
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <button className="btn btn-primary">Login</button>
                  <Link to="/signup" className="btn m-3">
                    Sign Up
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
