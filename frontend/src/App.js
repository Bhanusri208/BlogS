import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import BlogList from './components/BlogList/BlogList';
import BlogDetails from './components/BlogDetails/BlogDetails';
import CreateBlog from './components/CreateBlog/CreateBlog';
import Header from './components/Header/Header';
import EditBlog from './components/EditBlog/EditBlog';
import { Api_Url } from './components/ApiUrl/ApiUrl';
import Login from './components/Login/Login';

function App() {
    const apiUrl = Api_Url;

    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (term) => {
        setSearchTerm(term);
    };

    return (
        <Router>
            <div className="App">
                <Header onSearch={handleSearch} />
                <main>
                    <Routes>
                        <Route path='/login' element={<Login />} />
                        <Route path="/" element={<BlogList apiUrl={apiUrl} searchTerm={searchTerm} />} />
                        <Route path="/blog/:id" element={<BlogDetails apiUrl={apiUrl} />} />
                        <Route path="/edit/:id" element={<EditBlog apiUrl={apiUrl} />} />
                        <Route path="/create" element={<CreateBlog apiUrl={apiUrl} />} />
                    </Routes>
                </main>
                <footer>
                    <p>© 2024 Blog Application. All rights reserved.</p>
                </footer>
            </div>
        </Router>
    );
}

export default App;
