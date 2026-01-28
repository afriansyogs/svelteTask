import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { PrismaClient } from "@prisma/client";

import authRoutes from './routes/auth.js';
import taskRoutes from './routes/task.js';
import userRoutes from './routes/user.js';

// const bodyParser = require('body-parser');
const prisma = new PrismaClient();
const port = 3000
const app = express();

app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true
}));

app.use(express.json())
app.use('/uploads', express.static('uploads'));


app.use((req, res, next) => {
  req.prisma = prisma;
  next();
});

app.use('/auth', authRoutes);
app.use('/profile', userRoutes);
app.use('/', taskRoutes);

app.listen(port, '0.0.0.0' , () => {
  console.log(`listening port ${port}`)
});