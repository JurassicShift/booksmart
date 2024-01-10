const express = require('express');
const router = express.Router();

const multer = require("multer");
const { storage } = require("../../cloudinaryConfig");
const upload = multer({ storage });

const { getBookData, postLogin, postSignup, postWish, deleteBook, postRead, postRating, postPhoto, deletePhoto, postUpdatePw, deleteAc } = require('../controllers/indexControl');
const { checkUsernameAvailability, checkEmailAvailability, isAuthenticated, dataCheck } = require('../middleware/indexMiddleware');

router.get("/data",  getBookData);

router.post("/login",  postLogin);
router.post("/signup", checkUsernameAvailability, checkEmailAvailability, postSignup);

router.post("/wishadd", isAuthenticated, postWish );
router.delete("/bookdelete/:id/:list", isAuthenticated, deleteBook);
router.post("/postrating/:id/:rating", isAuthenticated, postRating);

router.post("/readadd", isAuthenticated, postRead );

router.post("/photoupload", isAuthenticated, dataCheck, upload.single("filename"), postPhoto);
router.delete("/photodelete", isAuthenticated, deletePhoto);

router.post("/updatepassword", isAuthenticated, postUpdatePw);

router.delete("/deleteaccount", isAuthenticated, deleteAc);
module.exports = router;