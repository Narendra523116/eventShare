const express = require("express");
const { managementSignup, managementLogin } = require("../controllers/managementController");
const router = express.Router();

router.post("/signup", managementSignup);
router.post("/login", managementLogin);

module.exports = router;
