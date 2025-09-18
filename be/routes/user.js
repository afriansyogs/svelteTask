const express = require('express')
const { protect } = require('../middlewares/AuthMiddleware')
const { addUserImg, getUserData, getUsername } = require('../controllers/UserController')
const upload = require('../middlewares/UploadsImgMiddleware')
const router = express.Router()

router.get('/', protect, getUserData)
router.get('/getUsername', protect, getUsername)
router.patch('/addAvatar', protect, upload.single('userImg'), addUserImg)

module.exports = router