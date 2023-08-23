const router = require("express").Router();
const auth = require("../middleware/auth");
const {
  createUser,
  getUsers,
  getUserByID,
  login,
  getUserByID1,
} = require("./user.controller");

router.post("/", createUser);
router.get("/all", getUsers);
router.get("/", auth, getUserByID);
router.get("/question", getUserByID1);
router.post("/login", login);

module.exports = router;
