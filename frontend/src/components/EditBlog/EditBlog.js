import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './EditBlog.css';

const EditBlog = ({ apiUrl }) => {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [imageURL, setImageURL] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await fetch(`${apiUrl}/api/blog/${id}`);
                const data = await response.json();
                setTitle(data.title);
                setContent(data.content);
                setImageURL(data.imageURL || '');
            } catch (error) {
                console.error('Error fetching blog:', error);
            }
        };

        fetchBlog();
    }, [id, apiUrl]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const blogData = { title, content, imageURL };

        try {
            await fetch(`${apiUrl}/api/updateBlog/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(blogData)
            });
            navigate('/');
        } catch (error) {
            console.error('Error updating blog:', error);
        }
    };

    return (
        <div className="edit-blog">
            <h1>Edit Blog</h1>
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
                <button type="submit">Update Blog</button>
            </form>
        </div>
    );
};

export default EditBlog;

