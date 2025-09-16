const express = require('express')
const { protect } = require('../middlewares/AuthMiddleware')
const { addUserImg, getUserData } = require('../controllers/UserController')
const upload = require('../middlewares/UploadsImgMiddleware')
const router = express.Router()

router.get('/', protect, getUserData)
router.patch('/addAvatar', protect, upload.single('userImg'), addUserImg)

module.exports = router