import express from 'express';
import { protect } from '../middlewares/AuthMiddleware.js';
import { updateUserData, getUserData, getUsername } from '../controllers/UserController.js';
import upload from '../middlewares/UploadsImgMiddleware.js';

const router = express.Router();

router.get('/', protect, getUserData)
router.get('/getUsername', protect, getUsername)
router.patch('/update', protect, upload.single('userImg'), updateUserData)

export default router;