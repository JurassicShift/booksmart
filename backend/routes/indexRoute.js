const express = require('express');
const router = express.Router();
const { getBookData, postLogin, postSignup, postWish, deleteBook, postRead } = require('../controllers/indexControl');
const { checkUsernameAvailability, checkEmailAvailability, isAuthenticated } = require('../middleware/indexMiddleware');

router.get("/data",  getBookData);

router.post("/login",  postLogin);
router.post("/signup", checkUsernameAvailability, checkEmailAvailability, postSignup);

router.post("/wishadd", isAuthenticated, postWish );
router.delete("/bookdelete/:id/:list", isAuthenticated, deleteBook);

router.post("/readadd", isAuthenticated, postRead );



module.exports = router;