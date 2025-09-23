const express = require('express')
const { protect } = require('../middlewares/AuthMiddleware')
const { updateUserData, getUserData, getUsername } = require('../controllers/UserController')
const upload = require('../middlewares/UploadsImgMiddleware')
const router = express.Router()

router.get('/', protect, getUserData)
router.get('/getUsername', protect, getUsername)
router.patch('/update', protect, upload.single('userImg'), updateUserData)

module.exports = router