const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const port = 3000;
const db = require('./connection.js');

app.use(bodyParser.json())

app.post('/register', async (req, res) => {
  try {
    let {username, email, password} = req.body
    if(!username || !email || !password) return res.status(400).json({messege: "All fields required"})

      const exitingUser = users.find(user => user.username === username)
      if(exitingUser) return res.status(409).json({messege: "username sudah digunakan"})
  } catch (error) {
    console.log(error)
    res.status(500).send(error);
  }
})

app.get('/', async (req, res) => {
  try {
    const query = 'SELECT * FROM users WHERE id='
    const task = await db.query(query);
    res.json(task);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post('/task', async (req, res) => {
  try {
    
  } catch (error) {
    
  }
})



app.listen(port, () => {
  console.log(`listening port ${port}`)
});