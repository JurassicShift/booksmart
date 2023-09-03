const express = require('express');
const router = express.Router();
const { getBookData, postLogin, postSignup } = require('../controllers/index');

router.get("/data",  getBookData);
router.post("/login",  postLogin);
router.post("/signup",  postSignup);

module.exports = router;