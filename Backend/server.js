require("dotenv").config();
const express = require("express");
const { MongoClient } = require("mongodb");

const app = express();
const PORT = 3000;

const client = new MongoClient(process.env.MONGO_URI);

async function connectDB() {
    try {
        await client.connect();
        console.log("Database connected successfully");
    } catch (error) {
        console.error("Database connection failed:", error.message);
    }
}

connectDB();

app.get("/", (req, res) => {
    const dbStatus = client.topology?.isConnected() ? "Connected" : "Not Connected";
    res.send(`<h1>Database Status: ${dbStatus}</h1>`);
});

app.get("/ping", (req, res) => {
    res.send("Pong!");
});

app.listen(PORT, () => {
    console.log(`Hi, my name is Kartikay Rattan. Server is running at http://localhost:${PORT}`);
});
