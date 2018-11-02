const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the API"
  });
});

app.post("/posts", verifyToken, (req, res) => {
  jwt.verify(req.token, "secretkey", (err, authData) => {
    if (err) {
      res.json({
        err
      });
    } else { 
      res.json({
        message: "Post created............",
        authData
      });
    }
  });
});


app.post("/login", (req, res) => {
  // Mock user
  const user = {
    id: 1,
    username: "BEKs",
    email: "ebaah98@gmail.com"
  }

  jwt.sign({user}, "secretkey", (err, token) => {
    res.json({
      token
    });
  });
});

// Verify Token function
function verifyToken(req, res, next) {
  // Get auth header
  const bearerHeader = req.headers["authorization"];
  // Check if bearer is undefined
  if (typeof bearerHeader !== "undefined") {
    // Split the space
    const bearer = bearerHeader.split(" ");
    // Get token from array
    const bearerToken = bearer[1];
    //Set token
    req.token = bearerToken;
    // Next middleware
    next();
  } else {
    // Forbidden
    res.sendStatus(403);
  }
}

app.listen(5000, () => console.log("Server Started on port 5000"));
