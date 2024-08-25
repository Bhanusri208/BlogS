const Blog = require('../models/Blogs');

// Get all blogs
exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Get a single blog
exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (blog == null) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new blog
exports.createBlog = async (req, res) => {
  const blog = new Blog({
    title: req.body.title,
    content: req.body.content,
    imageURL: req.body.imageURL, 
  });

  try {
    const newBlog = await blog.save();
    res.status(201).json(newBlog);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update a blog
exports.updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (blog == null) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    if (req.body.title != null) {
      blog.title = req.body.title;
    }
    if (req.body.content != null) {
      blog.content = req.body.content;
    }
    if (req.body.imageURL != null) { 
      blog.imageURL = req.body.imageURL;
    }

    const updatedBlog = await blog.save();
    res.json(updatedBlog);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};



// Delete a blog by ID
exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.json({ message: 'Blog deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


