// Require express and mongoose
const express = require("express");
const db = require("./config/connection");

const PORT = process.env.PORT || 3007;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(require("./routes"));

// running server
db.once("open", () => {
  console.log("mongodb connected")
  app.listen(PORT, () => {
    console.log(`API server is now running on port ${PORT}!`);
  });
});