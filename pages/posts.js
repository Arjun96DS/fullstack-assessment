import { useState } from 'react';
import { useRouter } from 'next/router';

export default function AddPost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [username, setUsername] = useState(''); // Add username state
  const router = useRouter();

  const handleAddPost = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5001/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Ensure cookies are included
        body: JSON.stringify({
          username, // Send username instead of user_id
          title,
          content,
        }),
      });

      if (response.ok) {
        router.push('/posts'); // Redirect to posts page upon successful post creation
      } else {
        const errorData = await response.json();
        alert(`Failed to add post: ${errorData.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while adding the post.');
    }
  };

  return (
    <div>
      <h1>Add Post</h1>
      <form onSubmit={handleAddPost}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="content">Content:</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit">Add Post</button>
      </form>
    </div>
  );
}
