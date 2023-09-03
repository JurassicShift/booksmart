const express = require('express');
const router = express.Router();
const { getBookData } = require('../controllers/index');

router.get("/data",  getBookData);

module.exports = router;