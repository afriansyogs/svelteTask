const express = require('express')
const router = express.Router()
const {taskData, newTask} = require('../controllers/TaskController')
const { protect } = require('../middlewares/AuthMiddleware')

router.get('/',protect, taskData)
router.post('/newTask',protect, newTask)

module.exports = router