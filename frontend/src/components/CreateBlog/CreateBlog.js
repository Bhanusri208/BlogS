import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateBlog.css';

const CreateBlog = ({ apiUrl }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [imageURL, setImageURL] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const blogData = { title, content, imageURL };

        try {
            await fetch(`${apiUrl}/api/blog`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(blogData)
            });
            navigate('/');
        } catch (error) {
            console.error('Error creating blog:', error);
        }
    };

    return (
        <div className="create-blog">
            <h1>Create Blog</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Content:</label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Image URL:</label>
                    <input
                        type="text"
                        value={imageURL}
                        onChange={(e) => setImageURL(e.target.value)}
                    />
                </div>
                <button type="submit">Create Blog</button>
            </form>
        </div>
    );
};

export default CreateBlog;
