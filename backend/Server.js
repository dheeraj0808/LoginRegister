const express = require("express");
const app = require("./src/app");

app.use(express.json());

const PORT = 3002;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
