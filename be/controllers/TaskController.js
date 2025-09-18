const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

exports.taskData = async (req, res) => {
  try {
    const userId = req.user.id;
    const task = await prisma.task.findMany({
      where: {userId}
    })

    if (task.length === 0) {
      return res.json({message: "Tidak ada data"})
    }
    console.log(`task nih ${task}`)
    res.status(200).json({message: "success get task data", task})
  } catch (error) {
    console.log(error.message)
    res.status(500).json({error: "failed get task data", details:error.message})
  }
}

exports.newTask = async (req, res) => {
  try {
    const userId = req.user.id;
    const {title, description, deadline, priority, status } = req.body

    const fileImage = req.files?.map(file => file.path) || null

    if (!title || !deadline) {
      return res.status(400).json({message: "fields required"})
    }
    
    const newTask = await prisma.task.create({
      data: {
        userId,
        title,
        description,
        taskImg: fileImage,
        deadline: new Date(deadline),
        priority,
        status
      }
    })
    console.log(`task nih ${newTask}`)
    res.status(200).json({message: "success get newTask data", newTask})
  } catch (error) {
    console.log(error.message)
    res.status(500).json({error: "failed add task", details:error.message})
  }
}

exports.taskDetail = async (req, res) => {
  try {
    const {id} = req.params
    if (!id)return res.status(401).json({message: "no task selected"})
    const task = await prisma.task.findUnique({
      where: {id}
    })

    if (!task)return res.status(402).json({error: "task not found"})

    res.status(200).json({message: "success task detail", task})
  } catch (error) {
    res.status(500).json({error: "failed get task detail", details: error.message})
  }
}

exports.taskEdit = async (req, res) => {
  try {
    const userId = req.user.id;
    const {id} = req.params
    const {title, description, deadline, priority, status } = req.body
    const fileImage = req.files?.map(file => file.path)

    if (!title || !deadline) {
      return res.status(400).json({message: "fields required"})
    }

    const editTask = await prisma.task.update({
      where: {
        id
      },
      data: {
        userId,
        title,
        description,
        taskImg: fileImage,
        deadline: new Date(deadline),
        priority,
        status
      }
    })
    res.status(200).json({message: "success update task", editTask})
  } catch (error) {
    res.status(500).json({error: "failed edit task", details: error.message})
  }
}

exports.taskDelete = async (req, res) => {
  try {
    const {id} = req.params;
    console.log(id)

    if (!id)return res.status(401).json({message: "no task selected"})
    const deleteTask = await prisma.task.delete({
      where: {
        id
      }
    })
    res.status(200).json({message: "succes delete task", deleteTask})
  } catch (error) {
    res.status(500).json({error: "failed deleted task ", details: error.message})
  }
}

