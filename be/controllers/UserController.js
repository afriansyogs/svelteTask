const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getUserData = async (req, res) => {
  try {
    const userId = req.user.id
    const userData = await prisma.user.findUnique({
      where: {
        id: userId
      }
    })
    res.status(200).json({message: "success get user data", userData})
  } catch (error) {
    res.status(500).json({error: "failed get user data", details: error.message})
  }
}

exports.addUserImg = async (req, res) => {
  try {
    const userId = req.user.id
    const userImg = req.file
    console.log('req.file:', req.file);
    console.log('req.body:', req.body);
    // return
    if (!userImg) return res.status(400).json({error: 'file required'})

    const newAvatar = await prisma.user.update({
      where: {
        id: userId
      },
      data: {
        userImg: userImg.path
      }
    });
    res.status(200).json({message: "succes upload file", newAvatar})
  } catch (error) {
    res.status(500).json({error: "failed upload file", details: error.message})
  }
}