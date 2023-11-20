import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../provider/authProvider.js';
import { useParams } from 'react-router-dom';

function SinglePostPage() {
  const [post, setPost] = useState({ text: '' });
  const { currentUser } = useAuth();
  const { token } = currentUser;
  const { postId } = useParams();

  useEffect(
    function getData() {
      async function fetchPost() {
        try {
          const response = await fetch(
            'http://localhost:8081/api/posts/' + postId,
            {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,
              },
            }
          );
          const postData = await response.json();
          setPost(postData);
        } catch (e) {
          console.log(e);
        }
      }
      fetchPost();
    },
    [token, postId]
  );
  return (
    <div>
      <h1>{post ? post.text : ''}</h1>
      <Link to="/posts">Return to list of posts</Link>
    </div>
  );
}

export default SinglePostPage;
