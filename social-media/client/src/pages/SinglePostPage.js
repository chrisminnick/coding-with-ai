import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

function SinglePostPage() {
  const { posts } = useSelector((state) => state.posts);
  const { postId } = useParams();

  return (
    <div>
      {posts ? (
        <p>{posts.find((post) => post._id === postId).text}</p>
      ) : (
        <p>Post not found</p>
      )}

      <Link to="/posts">Return to list of posts</Link>
    </div>
  );
}

export default SinglePostPage;
