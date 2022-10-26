const express = require('express');
const router = express.Router();
// const requireAuth = require('../middleware/requireAuth')

// user controllers
const {loginUser, signupUser, updateAdditionalInfo, getSingleUser} = require('../controllers/userController');
const {getImage,  postImage} = require('../controllers/imageController')


router.post('/login', loginUser)

// registration route 
router.post('/signup', signupUser)

router.get('/login/:id', getSingleUser)

router.patch('/login/:id', updateAdditionalInfo)
// login route

router.get("/login/upload/:id", getImage);

router.patch('/login/upload/:id', postImage);

module.exports = router;