const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'my_crud_app'
});

db.connect(err => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to database');
});

app.get('/users', (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.json(results);
  });
});

app.post('/users', (req, res) => {
  const { name, email, age } = req.body;
  db.query('INSERT INTO users (name, email, age) VALUES (?, ?, ?)', [name, email, age], (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.json({ id: results.insertId, name, email, age });
  });
});

app.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const { name, email, age } = req.body;
  db.query('UPDATE users SET name = ?, email = ?, age = ? WHERE id = ?', [name, email, age, id], (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.sendStatus(200);
  });
});

app.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM users WHERE id = ?', [id], (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.sendStatus(204);
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
