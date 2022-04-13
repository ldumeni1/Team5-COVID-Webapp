const express = require("express");
const bodyParser = require('body-parser');
const mysql = require("mysql");
const cors = require('cors');

const app = express();

// connecting to MySQL server
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Anurag#123', // update me
  database: 'cases',
});

const PORT = process.env.PORT || 3001;

// required middlewares
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// api to get national level data
app.get('/get_national_level/:nl_date', (req, res) => {

  const date = req.params.nl_date;
  
  const sql_get = "SELECT * FROM national_level WHERE nl_date = ?";

  db.query(sql_get,[date], (err, results, fields) => {
    if(err) throw err;
    //console.log(results);
    res.send(results);
  });
});

// api to get state level data
app.get('/get_state_level/:sl_date/:sl_state', (req, res) => {

  var date = req.params.sl_date;
  var state = req.params.sl_state;
  
  const sql_get = "SELECT * FROM state_level WHERE sl_date = ? AND sl_state = ?";

  db.query(sql_get,[date, state], (err, results, fields) => {
    if(err) throw err;
    //console.log(results);
    res.send(results);
  });
});

// api to get county level data
app.get('/get_county_level/:cl_date/:cl_state/:cl_county', (req, res) => {

  var date = req.params.cl_date;
  var state = req.params.cl_state;
  var county = req.params.cl_county;
  
  const sql_get = "SELECT * FROM county_level WHERE cl_date = ? AND cl_county = ? AND cl_state = ?";

  db.query(sql_get,[date, county, state], (err, results, fields) => {
    if(err) throw err;
    //console.log(results);
    res.send(results);
  });
});


app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});