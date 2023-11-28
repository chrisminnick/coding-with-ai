import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addPost, postPost } from '../features/posts/postsSlice';

function AddPost(props) {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [postText, setPostText] = useState('');

  async function submitPost() {
    try {
      setPostText('');
      const postPostAction = await dispatch(postPost('test', token));

      dispatch(addPost({ _id: 121, text: postPostAction.payload }));
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div>
      <h2>Add a new post</h2>
      <input
        type="text"
        value={postText}
        onChange={(e) => setPostText(e.target.value)}
      />
      <button onClick={submitPost}>Submit Post</button>
    </div>
  );
}
export default AddPost;
