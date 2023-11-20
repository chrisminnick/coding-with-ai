import { Link } from 'react-router-dom';
import { memo } from 'react';

function HomePage() {
  return (
    <>
      <h1>Welcome</h1> <Link to="/login">Login</Link>
    </>
  );
}
export default memo(HomePage);
