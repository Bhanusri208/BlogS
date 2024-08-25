import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './BlogDetails.css';
import { FaBackwardFast } from "react-icons/fa6";


const BlogDetails = ({ apiUrl }) => {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);

    useEffect(() => {
        fetchBlogDetails();
    }, [id]);

    const fetchBlogDetails = async () => {
        try {
            const response = await fetch(`${apiUrl}/api/blog/${id}`);
            const data = await response.json();
            setBlog(data);
        } catch (error) {
            console.error('Error fetching blog details:', error);
        }
    };

    if (!blog) return <div>Loading...</div>;

    return (
        <div className="blog-details">
            <h2>{blog.title}</h2>
            {blog.imageURL && <img src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png" alt={blog.title} className='pic'/>}
            <p>{blog.content}</p>
            <Link to="/"><FaBackwardFast /><br/>Back</Link>
        </div>
    );
};

export default BlogDetails;
