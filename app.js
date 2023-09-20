const express = require('express');
var bodyParser = require('body-parser')
const general = require('./general');
const pool = require('./mysqlPool');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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
  const result = await pool.query(`SELECT * FROM users WHERE userId = ${req.params.userId} LIMIT 1`, (err, data) => {
    if (err) throw err;

    res.json({
      status: "success",
      data: data
    });
  });
});

app.post('/createuser', async (req, res) => {
  console.log(req.body)
  if (general.createUserValid(req.body)) {
    const fstName = req.body.firstName;
    const lstName = req.body.lastName;
    const birthDate = req.body.birthDate;
    const sqlStr = `INSERT INTO users (firstName, lastName, birthDate) VALUES ('${fstName}', '${lstName}', '${birthDate}')`
    const result = await pool.query(sqlStr, 
      (err, data) => {
        if (err) throw err;

        res.json({
          status: "success",
          data: data
        });
      }
    );
  } else {
    res.json({
      status: "error",
      message: "Incorrect request body!"
    });
  }
});

app.post('/updateuser', async (req, res) => {
  if (general.updateUserValid(req.body)) {
    const sqlStr = generateUpdateSqlStr(
      req.body.userId,
      req.body.firstName,
      req.body.lastName,
      req.body.birthDate,
      req.body.isActive
    );
    const result = await pool.query(sqlStr, 
      (err, data) => {
        if (err) throw err;

        res.json({
          status: "success",
          data: data
        });
      }
    );
  } else {
    res.json({
      status: "error",
      message: "Incorrect request body!"
    });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})