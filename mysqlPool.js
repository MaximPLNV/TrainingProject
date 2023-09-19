const mysql = require('mysql');
const mysqlCfg = require('./mysqlConfigSettings');

const pool = mysql.createPool(mysqlCfg);

module.exports = pool;