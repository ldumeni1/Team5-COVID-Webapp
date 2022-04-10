const mysql = require("mysql");

// connecting to MySql server
const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Anurag#123', // update me
  database: 'cases',
  connectionLimit: 1000
});

module.exports = db;

