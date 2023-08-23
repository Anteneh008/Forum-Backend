const router = require("express").Router();
const multer = require("multer");
const path = require("path");

const { handleUploadProfilePicture } = require("./profile.controller");
// router.post("/", handleUploadProfilePicture);

// Set up the multer middleware for file uploads
const storage = multer.diskStorage({
  destination: path.join(__dirname, "uploads"),
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

// Use CORS middleware specifically for the profile picture upload route
const corsOptions = {
  origin: "https://4337a2e4.forum-frontend-3fm.pages.dev", // Replace with your frontend domain
  methods: "POST", // Allow only POST requests
  credentials: true, // Enable cookies and authentication headers
};

// Define the route and attach the middleware and controller function
router.post("/",cors(corsOptions), upload.single("profilePicture"), handleUploadProfilePicture);

module.exports = router;
