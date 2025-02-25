require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const snackRoutes = require('./snackroutes');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

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
        // Start the server only after the DB is connected
    })
    .catch((error) => {
        console.error('Database connection failed:', error.message);
        process.exit(1); // Exit the process with failure
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
