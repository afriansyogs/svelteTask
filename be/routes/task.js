import express from 'express';
import upload from '../middlewares/UploadsImgMiddleware.js';
import {
  taskData,
  newTask,
  taskDetail,
  taskDelete,
  taskEdit,
  updateStatus
} from '../controllers/TaskController.js';
import { protect } from '../middlewares/AuthMiddleware.js';

const router = express.Router();

router.get('/', protect, taskData)
router.post('/newTask', protect, upload.array('taskImg', 3), newTask)
router.delete('/deleteTask/:id', protect, taskDelete)
router.get('/taskDetail/:id', protect, taskDetail)
router.patch('/editTask/:id', protect, upload.array('taskImg', 3), taskEdit)
router.patch('/editStatus/:id', protect, updateStatus)

export default router;