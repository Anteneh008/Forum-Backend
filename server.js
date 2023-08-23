require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const port = process.env.PORT||80;
const userRouter = require("./server/api/users/user.router");
const userRouter2 = require("./server/api/questions/question.router");
const userRouter3 = require("./server/api/answer/answer.router");
const userRouter4 = require("./server/api/answer/answer.router");
const userRouter5 = require("./server/api/reset/reset.router");
const userRouter6 = require("./server/api/reset/reset.router");
const userRouter7 = require("./server/api/profile/profile.router");

// Configure CORS
const corsOptions = {
    origin: "https://4337a2e4.forum-frontend-3fm.pages.dev", // Replace with your frontend domain
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // Enable cookies and authentication headers
  };

app.use(cors(corsOptions));

// Set up CORS pre-flight options for /api/upload
app.options('/api/upload', cors(corsOptions));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/users", userRouter);
app.use("/api/questions", userRouter2);
app.use("/api/submit-answer", userRouter3);
app.use("/api/get-answers", userRouter4);
app.use("/api/reset-password", userRouter5);
app.use("/api/reset", userRouter6);

// Serve static files from the 'uploads' directory
app.use("/uploads", express.static(path.join(__dirname, "./server/api/profile/uploads")));

app.use("/api/upload", userRouter7);

app.listen(port,"0.0.0.0", () => console.log(`Listening at http://localhost:${port}`));
