const express = require('express');
const pool = require('./mysqlPool');

const app = express();
const port = 3000;

app.get('/users', async (req, res) => {
  const result = await pool.query('SELECT * FROM users', (err, data) => {
    if (err) throw err;

    res.json({
      status: "success",
      data: data
    });
  });
});

app.get('/user/:userId', async (req, res) => {
  if (!req.params.userId) {
    res.json({
      status: "error",
    });
  }
  
  const result = await pool.query(`SELECT * FROM users WHERE userId = ${req.params.userId} LIMIT 1`, (err, data) => {
    if (err) throw err;

    res.json({
      status: "success",
      data: data
    });
  });
});

app.post('/createuser', async (req, res) => {

});

app.post('/updateuser', async (req, res) => {

});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})