const express = require('express');
const app = express();
const port = 3000;
const db = require('./connection.js');


app.get('/', async (req, res) => {
  try {
    const task = await db.query('SELECT * FROM task');
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