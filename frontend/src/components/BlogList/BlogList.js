import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MdDelete } from "react-icons/md";
import { MdReadMore } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import './BlogList.css';

const BlogList = ({ apiUrl, searchTerm }) => {
    const [blogs, setBlogs] = useState([]);
    const [filteredBlogs, setFilteredBlogs] = useState([]);

    useEffect(() => {
        fetchBlogs();
    }, []);

    useEffect(() => {
      
        const filtered = blogs.filter(blog =>
            blog.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredBlogs(filtered);
    }, [searchTerm, blogs]);

    const fetchBlogs = async () => {
        try {
            const response = await fetch(`${apiUrl}/api/blogs`);
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            const data = await response.json();
            setBlogs(data);
            setFilteredBlogs(data);
        } catch (error) {
            console.error('Error fetching blogs:', error.message);
        }
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this blog?");
        if (confirmDelete) {
            try {
                await fetch(`${apiUrl}/api/deleteBlog/${id}`, { method: 'DELETE' });
                setBlogs(blogs.filter(blog => blog._id !== id));
                setFilteredBlogs(filteredBlogs.filter(blog => blog._id !== id));
            } catch (error) {
                console.error('Error deleting blog:', error);
            }
        }
    };

    return (
        <div className="blog-list">
            {filteredBlogs.length === 0 ? (
                <p>No blogs found</p>
            ) : (
                <ul>
                    {filteredBlogs.map(blog => (
                        <li key={blog._id}>
                            <h2>{blog.title}</h2>
                            {blog.imageURL && (
                                <div><img src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png" alt={blog.title} className='pic'/></div>
                            )}
                            <p>{blog.content}</p>
                            <div className="actions">
                                <Link to={`/blog/${blog._id}`}>
                                    <MdReadMore /> Read More
                                </Link>
                                <Link to={`/edit/${blog._id}`}>
                                    <FaEdit /> Edit
                                </Link>
                                <MdDelete
                                    onClick={() => handleDelete(blog._id)}
                                    className="del-button"
                                />
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default BlogList;

