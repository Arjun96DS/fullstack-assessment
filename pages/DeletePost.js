import { useState } from 'react';

export default function DeletePost() {
    const [postId, setPostId] = useState('');

    const handleDelete = async () => {
        const response = await fetch(`http://localhost:5001/api/posts/${postId}`, {
            method: 'DELETE',
            credentials: 'include', // Include credentials to ensure authentication
        });

        if (response.ok) {
            alert('Post deleted successfully');
            // Optionally, refresh the post list or redirect
        } else {
            const errorData = await response.json();
            console.error('Error:', errorData.error || 'Failed to delete post');
            alert('Failed to delete post');
        }
    };

    return (
        <div>
            <h1>Delete Post</h1>
            <label>
                Post ID:
                <input type="number" value={postId} onChange={(e) => setPostId(e.target.value)} />
            </label>
            <br />
            <button onClick={handleDelete}>Delete Post</button>
        </div>
    );
}
