const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const BlogRoute = require('./routes/BlogRoute');

dotenv.config();

const app = express();
const PORT = 4000;

app.use(express.json());
app.use(cors());



// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected successfully!"))
    .catch((error) => console.log(`MongoDB connection error: ${error.message}`));


// Welcome route
app.get('/', (req, res) => {
    res.send("<h1>Welcome Bhanuuu</h1>");
});

// API Routes
app.use('/api', BlogRoute);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
