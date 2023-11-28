import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getPosts, setPosts } from '../features/posts/postsSlice.js';
import AddPost from '../components/AddPost.js';

function PostsPage() {
  const { token } = useSelector((state) => state.auth);
  const { posts } = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    async function getData() {
      const postsAction = await dispatch(getPosts(token));
      dispatch(setPosts(postsAction.payload));
    }
    getData();
  }, [token, dispatch]);

  return (
    <>
      <h1>Latest Posts</h1>
      {posts
        ? posts.map((post, index) => (
            <p key={index}>
              <Link to={'/posts/' + post._id}>{post.text}</Link>
            </p>
          ))
        : ''}
      <AddPost setPosts={setPosts} posts={posts} />
      <Link to="/logout">Log out</Link>
    </>
  );
}

export default PostsPage;
