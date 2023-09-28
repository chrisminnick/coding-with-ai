import { Link } from 'react-router-dom';

function Posts() {
  return (
    <div>
      <h1>Posts</h1>
      <Link to="/logout">Log out</Link>
    </div>
  );
}

export default Posts;
