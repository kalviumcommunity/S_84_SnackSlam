require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const snackRoutes = require('./snackroutes');
const mysqlData = require('./routes/SqlSnack');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(cors({
    origin: ['http://localhost:5173','https://asap-snackslam.netlify.app'], // Allow requests from your frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true // Enable cookies or authentication headers if needed
}));

// Connect to MongoDB using Mongoose
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Hi, my name is Kartikay Rattan. Server is running at http://localhost:${PORT}`);
        });
        console.log('Database connected successfully');
    })
    .catch((error) => {
        console.error('Database connection failed:', error.message);
        process.exit(1);
    });

// Base route
app.get('/', (req, res) => {
    res.send(`<h1>Welcome to SnackSlam API!</h1>`);
});

// Ping route
app.get('/ping', (req, res) => {
    res.send('Pong!');
});

// Use the routes from snackRoutes.js
app.use('/api', snackRoutes);
app.use('/sql', mysqlData);
