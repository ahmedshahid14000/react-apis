const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'usersdb',
});

db.connect(err => {
  if (err) throw err;
  console.log('MySQL connected');
  db.query(`
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100),
      email VARCHAR(100)
    )
  `);
});

app.post('/users', (req, res) => {
  const { name, email } = req.body;
  db.query('INSERT INTO users (name, email) VALUES (?, ?)', [name, email], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send({ id: result.insertId, name, email });
  });
});

app.get('/users', (req, res) => {
  db.query('SELECT * FROM users', (err, rows) => {
    if (err) return res.status(500).send(err);
    res.json(rows);
  });
});

app.listen(3000, '0.0.0.0', () => {
  console.log('Backend running on port 3000');
});
