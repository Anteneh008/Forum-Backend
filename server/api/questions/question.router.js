const router = require("express").Router();
const auth = require("../middleware/auth");

const { insertQuestion, getUserByID } = require("./question.controller");

router.post("/", insertQuestion);
// router.get("/", auth, getUserByID);
module.exports = router;
