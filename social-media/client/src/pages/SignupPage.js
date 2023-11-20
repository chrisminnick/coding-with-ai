import { useSelector, useDispatch } from 'react-redux';

import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function SignupPage() {
  const { token } = useSelector((state) => state.auth);

  const [signupMessage, setSignupMessage] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    if (token) {
      navigate('/posts', { replace: true });
    }
  }, [navigate, token]);
  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8081/api/user/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          displayName: e.target.displayName.value,
          email: e.target.email.value,
          password: e.target.password.value,
        }),
      });
      const data = await response.json();

      console.log(data);

      if (data.message) {
        setSignupMessage(data.message);
        if (signupMessage === 'User created!') {
        }
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="card mt-5">
            <div className="card-header">
              <h4>Sign Up</h4>
            </div>
            <div className="card-body">
              {signupMessage && (
                <div className="alert alert-success" role="alert">
                  {signupMessage} Please <Link to="/login">login</Link>
                </div>
              )}
              <form onSubmit={handleSignup}>
                <div className="form-group mb-3">
                  <label>Email</label>
                  <input
                    required
                    type="email"
                    id="email"
                    className="form-control"
                  />
                </div>
                <div className="form-group mb-3">
                  <label>Display Name</label>
                  <input
                    type="text"
                    id="displayName"
                    className="form-control"
                  />
                </div>
                <div className="form-group mb-3">
                  <label>Password</label>
                  <input
                    required
                    type="password"
                    id="password"
                    className="form-control"
                  />
                </div>
                <div className="form-group mb-3">
                  <button className="btn btn-primary">Sign Up</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
