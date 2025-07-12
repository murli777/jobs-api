const express = require("express");
const router = express.Router();

const { sign_up, login } = require("../controllers/auth");

router.route("/login").post(login);
router.route("/signup").post(sign_up);

module.exports = router;
