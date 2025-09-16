const express = require('express')
const port = 3000
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
// const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  credentials: true
}));

app.use(express.json())
app.use('/uploads', express.static('uploads'));

const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')
const taskRoutes = require('./routes/task')

app.use((req, res, next) => {
  req.prisma = prisma;
  next();
});

app.use('/auth', authRoutes);
app.use('/profile', userRoutes);
app.use('/', taskRoutes);

app.listen(port, () => {
  console.log(`listening port ${port}`)
});