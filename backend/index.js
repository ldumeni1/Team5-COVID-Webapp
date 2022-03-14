const express = require("express");
const bodyParser = require('body-parser');
const mysql = require("mysql");
const cors = require('cors');

const app = express();

// connecting to MySql server
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Anurag#123', // please change this to your password
  database: 'test_db',
});


const PORT = process.env.PORT || 3001;

// required middlewares
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// api to insert data into DB
app.post('/insert', (req, res) => {
  const uid = req.body.uid;
  const uname = req.body.uname;

  const sql_ins = "INSERT INTO folks (uid, uname) VALUES(?, ?);"
  db.query(sql_ins, [uid, uname], (err, result) => {
    console.log(result);
  })
});


app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});