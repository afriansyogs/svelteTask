const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

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
    const {title, description,taskImg, deadline, priority, status } = req.body

    if (!title || !deadline) {
      return res.json({message: "fields required"})
    }
    
    const newTask = await prisma.task.create({
      data: {
        userId,
        title,
        description,
        taskImg,
        deadline,
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
    const task = await prisma.task.findUnique({
      where: {id}
    })

    if (!task)return res.status(402).json({error: "task not found"})

    res.status(200).json({message: "success task detail", task})
  } catch (error) {
    res.status(500).json({error: "failed get task detail", details: error.message})
  }
}