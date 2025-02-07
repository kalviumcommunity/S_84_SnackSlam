const express = require("express");
const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
    res.send("Welcome to my Express server!");
});

app.get("/ping", (req, res) => {
    res.send("Pong!");
});

app.listen(PORT, () => {
    console.log(`Hi, my name is Kartikay Rattan. Server is running on http://localhost:${PORT}`);
});
