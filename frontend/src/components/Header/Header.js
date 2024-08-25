import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (event) => {
        const value = event.target.value;
        setSearchTerm(value);
        onSearch(value); 
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
    };

    return (
        <header className="header">
            <Link to="/" className="nav-link">Blogs</Link>
            <nav>
                <form className="search-form" onSubmit={handleSearchSubmit}>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        placeholder="Search..."
                        className="search-input"
                    />
                </form>
                <Link to="/create" className="create-btn">Create New Blog</Link>
            </nav>
        </header>
    );
};

export default Header;
