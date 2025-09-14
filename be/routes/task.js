const express = require('express')
const router = express.Router()
const {taskData, newTask, taskDetail} = require('../controllers/TaskController')
const { protect } = require('../middlewares/AuthMiddleware')

router.get('/', protect, taskData)
router.post('/newTask', protect, newTask)
router.get('/taskDetail/:id', protect, taskDetail)

module.exports = router