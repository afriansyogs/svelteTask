const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getUsername = async (req, res) => {
  try {
    const userId = req.user.id
    const userNameData = await prisma.user.findUnique({
      where: {
        id: userId
      },
      select: {
        username: true
      }
    })
    res.status(200).json({message: "success get username", userNameData})
  } catch (error) {
    res.status(500).json({error: "failed Get Username", details: error.message})
  }
}

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

exports.updateUserData = async (req, res) => {
  try {
    const userId = req.user.id
    const {username, email} = req.body
    const userImg = req.file
    console.log('req.file:', req.file);
    console.log('req.body:', req.body);
    // return
    if (!username || !email)return res.status(400).json({error: 'file required'})

    const userData = {
      username,
      email
    }

    if (userImg) {
      userData.userImg = userImg.path
    }

    const update = await prisma.user.update({
      where: {
        id: userId
      },
      data: userData
    });
    res.status(200).json({message: "succes upload file", update})
  } catch (error) {
    res.status(500).json({error: "failed upload file", details: error.message})
  }
}