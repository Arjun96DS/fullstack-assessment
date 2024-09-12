import { useState } from 'react';

export default function CreateComment() {
    const [postId, setPostId] = useState('');
    const [author, setAuthor] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:5001/api/comments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include', // Ensure cookies are sent with the request
            body: JSON.stringify({ post_id: postId, author, content }),
        });
        if (response.ok) {
            alert('Comment created successfully');
        } else {
            const errorData = await response.json();
            console.error('Error:', errorData.error || 'Failed to create comment');
            alert('Failed to create comment');
        }
    };
    
    return (
        <div>
            <h1>Create Comment</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Post ID:
                    <input type="number" value={postId} onChange={(e) => setPostId(e.target.value)} />
                </label>
                <br />
                <label>
                    Author:
                    <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} />
                </label>
                <br />
                <label>
                    Content:
                    <textarea value={content} onChange={(e) => setContent(e.target.value)} />
                </label>
                <br />
                <button type="submit">Create Comment</button>
            </form>
        </div>
    );
}
