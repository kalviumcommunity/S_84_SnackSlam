require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const snackRoutes = require('./snackroutes');
const mysqlData = require('./routes/SqlSnack');
const authRoutes = require('./routes/auth');

const app = express();
const PORT =  3000;

// Middleware
app.use(express.json());
app.use(cors({
    origin: ['http://localhost:5173', 'https://asap-snackslam.netlify.app'], // Allowed frontend origins
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true // Allow cookies and authentication headers
}));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('✅ MongoDB Connected Successfully');
    app.listen(PORT, () => {
        console.log(`🚀 Server is running at http://localhost:${PORT}`);
    });
})
.catch((error) => {
    console.error('❌ MongoDB Connection Failed:', error.message);
    process.exit(1);
});

// Routes
app.get('/', (req, res) => {
    res.send(`<h1>Welcome to SnackSlam API 🎉</h1><p>Your go-to snack rating platform!</p>`);
});

app.get('/ping', (req, res) => {
    res.send('Pong! 🏓');
});

// API Routes
app.use('/api', snackRoutes); // Adjusted path for better API structure
app.use('/api/auth', authRoutes);
app.use('/api/sql', mysqlData); // Unified API path structure

module.exports = app;
