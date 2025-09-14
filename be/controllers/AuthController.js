const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signToken = id => {
  return jwt.sign({id}, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  })
}

exports.register = async (req, res) => {
  const {username, email, password} = req.body;
  
  if (!username || !email || !password) {
    return res.status(500).json({ error: 'fields required' });
  }

  try {
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashPassword
      },
    })
    console.log(user)
    res.status(200).json({message: "success register", user})
  } catch (error) {
    console.log(error.message)
    res.status(500).json({error: "register failed", details: error.message})
  }
}

exports.login = async (req, res) => {
  const {email, password} = req.body;
  if (!email || !password) {
    return res.status(500).json({error: "fields required"})
  }
  
  try {
    const user = await prisma.user.findUnique({
      where: {email}
    });

    const matchPassword = await bcrypt.compare(password, user.password)

    if (!user || !matchPassword) {
      return req.status(401).json({error: "invalid cridential"})
    }

    const token = signToken(user.id)
    console.log(`token jadi nih ${token}`)
    res.status(200).json({message: "login success", token})
  } catch (error) {
    console.log(error.message)
    res.status(500).json({error: "Login Failed", details: error.message})
  }
}