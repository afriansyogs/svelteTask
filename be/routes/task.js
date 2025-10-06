const express = require('express')
const router = express.Router()
const upload = require('../middlewares/UploadsImgMiddleware')
const {taskData, newTask, taskDetail, taskDelete, taskEdit, updateStatus} = require('../controllers/TaskController')
const { protect } = require('../middlewares/AuthMiddleware')

router.get('/', protect, taskData)
router.post('/newTask', protect, upload.array('taskImg', 3), newTask)
router.delete('/deleteTask/:id', protect, taskDelete)
router.get('/taskDetail/:id', protect, taskDetail)
router.patch('/editTask/:id', protect, upload.array('taskImg', 3), taskEdit)
router.patch('/editStatus/:id', protect, updateStatus)

module.exports = router