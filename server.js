const express = require('express');
const pool = require('./db');

const port = process.env.PORT || 3000;

const app = express();
app.use(express.json());

app.get('/', async (req, res) => {
  try {
    const data = await pool.query('SELECT * FROM schools');
    res.status(200).send(data.rows)
  } catch(err){
    res.status(500).send(err);
  }
})

app.post('/', async (req, res) => {
  const { name, location } = req.body;
  try {
    await pool.query('INSERT INTO schools( name, address ) VALUES ($1, $2)', [name, location]);
    res.status(200).send({message: "Successfully"})
  } catch(err){
    res.status(500).send(err);
  }
})

app.get('/setup', async (req, res) => {
  try {
    await pool.query('CREATE TABLE schools( id SERIAL PRIMARY KEY, name VARCHAR(100), address VARCHAR(100))')
    res.status(200).send({message: "Successfully created table"})
  } catch(err){
    res.status(500).send(err);
  }
})

app.listen(port, () => console.log(`http://localhost:${port}`));
