const express = require('express');
const bodyParser = require('body-parser');
const general = require('./general');
const pool = require('./mysqlPool');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/users', async (req, res) => {
  pool.query('SELECT * FROM users', (err, data) => {
    if (err) throw err;

    res.json({
      status: 'success',
      data: data,
    });
  });
});

app.get('/user/:userId', async (req, res) => {
  pool.query(`SELECT * FROM users WHERE userId = ${req.params.userId} LIMIT 1`, (err, data) => {
    if (err) throw err;

    res.json({
      status: 'success',
      data: data,
    });
  });
});

app.post('/createuser', async (req, res) => {
  if (general.createUserValid(req.body)) {
    const fstName = req.body.firstName;
    const lstName = req.body.lastName;
    const birthDate = req.body.birthDate;
    const sqlStr = `INSERT INTO users (firstName, lastName, birthDate) VALUES ('${fstName}', '${lstName}', '${birthDate}')`;

    pool.query(sqlStr,
        (err, data) => {
          if (err) throw err;

          res.json({
            status: 'success',
            data: data,
          });
        },
    );
  } else {
    res.json({
      status: 'error',
      message: 'Incorrect request body!',
    });
  }
});

app.post('/updateuser', async (req, res) => {
  if (general.updateUserValid(req.body)) {
    const sqlStr = general.generateUpdateSqlStr(
        req.body.userId,
        req.body.firstName,
        req.body.lastName,
        req.body.birthDate,
        req.body.isActive,
    );

    pool.query(sqlStr,
        (err, data) => {
          if (err) throw err;

          res.json({
            status: 'success',
            data: data,
          });
        },
    );
  } else {
    res.json({
      status: 'error',
      message: 'Incorrect request body!',
    });
  }
});

module.exports = app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
