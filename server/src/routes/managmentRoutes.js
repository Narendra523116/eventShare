const express = require("express");
const { managmentSignup, managmentLogin } = require("../controllers/managmentController");
const router = express.Router();

router.post("/signup", managmentSignup);
router.post("/login", managmentLogin);

module.exports = router;
