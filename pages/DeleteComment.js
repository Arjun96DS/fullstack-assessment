import { useState } from 'react';

export default function DeleteComment() {
    const [commentId, setCommentId] = useState('');

    const handleDelete = async () => {
        const response = await fetch(`http://localhost:5001/api/comments/${commentId}`, {
            method: 'DELETE',
            credentials: 'include', // Include credentials to ensure authentication
        });

        if (response.ok) {
            alert('Comment deleted successfully');
            // Optionally, refresh the comment list or redirect
        } else {
            const errorData = await response.json();
            console.error('Error:', errorData.error || 'Failed to delete comment');
            alert('Failed to delete comment');
        }
    };

    return (
        <div>
            <h1>Delete Comment</h1>
            <label>
                Comment ID:
                <input type="number" value={commentId} onChange={(e) => setCommentId(e.target.value)} />
            </label>
            <br />
            <button onClick={handleDelete}>Delete Comment</button>
        </div>
    );
}
