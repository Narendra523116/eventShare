const express = require("express");
const { hodSignup, hodLogin } = require("../controllers/hodController");
const router = express.Router();

router.post("/signup", hodSignup);
router.post("/login", hodLogin);

module.exports = router;
