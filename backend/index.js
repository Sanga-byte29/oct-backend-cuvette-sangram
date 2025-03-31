const express = require("express");
const app = express();
const env = require("dotenv");
const cors = require("cors");
const port = process.env.PORT || 8080;
app.use(cors());
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Hello from server",
  });
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// build both server and connect them
// read more about cors and dotenv
