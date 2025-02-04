const express = require("express");
const app = express();
const PORT = 3000;

app.get("/ping", (req, res) => {
    res.send("Pong!");
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});