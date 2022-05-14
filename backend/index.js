const express = require("express");
const bodyParser = require('body-parser');
const mysql = require("mysql");
const cors = require('cors');

// importing the module
const database = require("./db")

// creating DB tables
database.create_tables();

const app = express();

// connecting to MySQL server
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  //password: '5y5t3m100', // update me
  password: 'Anurag#123',
  database: 'team5_webapp',
});

const PORT = process.env.PORT || 3001;

// required middlewares
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

/*

// api to fetch national level infection data
app.get('/get_national_level/', (req, res) => {

  const date = req.params.nl_date;
  
  const sql_get = "SELECT * FROM national_level";

  db.query(sql_get,[date], (err, results, fields) => {
    if(err) throw err;
    //console.log(results);
    res.send(results);
  });
});

// api to fetch state level infection data
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

// api to fetch county level infection data
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
*/

// api to fetch county level cases, deaths, vaccination data 
app.get('/get_county_level_all/:cl_state/:cl_county', (req, res) => {

  //var date = req.params.cl_date;
  var state = req.params.cl_state;
  var county = req.params.cl_county;


  // cv_category = Complete in the query retrives fully vaccinated record
  const sql_get = " SELECT cl_county, cl_state, cl_cases, cl_deaths, cv_total\
                    FROM county_level inner join county_level_vaccination \
                    on(fips = cv_fips)\
                    where cv_category = 'Complete' AND cl_county = ? AND cl_state = ?" 
  
  db.query(sql_get,[county, state], (err, results, fields) => {
    if(err) throw err;
    // console.log(results);
    res.send(results);
  });
});

app.get('/get_counties_by_state/:cl_state/', (req, res) => {

  var state = req.params.cl_state;

  const sql_get = " SELECT cl_county, cl_state, cl_cases, cl_deaths FROM county_level WHERE cl_state = ?" 
  
  db.query(sql_get,[state], (err, results, fields) => {
    if(err) throw err;
    res.send(results);
  });
});

app.get('/get_counties_vax_by_state/:cl_state/', (req, res) => {

  var state = req.params.cl_state;

  const sql_get = " SELECT cv_county, cv_total FROM county_level_vaccination WHERE cv_state = ? AND cv_category = 'Complete'" 
  
  db.query(sql_get,[state], (err, results, fields) => {
    if(err) throw err;
    res.send(results);
  });
});


// *************** apis to fetch deaths ****************** //

// api to fetch national level death data
app.get('/get_national_level_death/:nl_date', (req, res) => {

  const date = req.params.nl_date;
  
  const sql_get = "SELECT nl_deaths FROM national_level where nl_date = ?";

  db.query(sql_get,[date], (err, results, fields) => {
    if(err) throw err;
    //console.log(results);
    res.send(results);
  });
});

// api to fetch state level death data
app.get('/get_state_level_death/:sl_date/:sl_state', (req, res) => {

  var date = req.params.sl_date;
  var state = req.params.sl_state;
  
  const sql_get = "SELECT sl_deaths FROM state_level WHERE sl_date = ? AND sl_state = ?";

  db.query(sql_get,[date, state], (err, results, fields) => {
    if(err) throw err;
    //console.log(results);
    res.send(results);
  });
});

// api to fetch county level death data
app.get('/get_county_level_death/:cl_date/:cl_state/:cl_county', (req, res) => {

  var date = req.params.cl_date;
  var state = req.params.cl_state;
  var county = req.params.cl_county;
  
  const sql_get = "SELECT cl_confirmed_deaths FROM county_level WHERE cl_date = ? AND cl_county = ? AND cl_state = ?";

  db.query(sql_get,[date, county, state], (err, results, fields) => {
    if(err) throw err;
    //console.log(results);
    res.send(results);
  });
});

// *************** apis to fetch cases ****************** //

// api to fetch national level cases
app.get('/get_national_level_cases/:nl_date', (req, res) => {

  const date = req.params.nl_date;
  
  const sql_get = "SELECT nl_cases FROM national_level where nl_date = ?";

  db.query(sql_get,[date], (err, results, fields) => {
    if(err) throw err;
    //console.log(results);
    res.send(results);
  });
});

// api to fetch state level cases
app.get('/get_state_level_cases/:sl_date/:sl_state', (req, res) => {

  var date = req.params.sl_date;
  var state = req.params.sl_state;
  
  const sql_get = "SELECT sl_cases FROM state_level WHERE sl_date = ? AND sl_state = ?";

  db.query(sql_get,[date, state], (err, results, fields) => {
    if(err) throw err;
    //console.log(results);
    res.send(results);
  });
});

// api to fetch county level cases
app.get('/get_county_level_cases/:cl_date/:cl_state/:cl_county', (req, res) => {

  var date = req.params.cl_date;
  var state = req.params.cl_state;
  var county = req.params.cl_county;
  
  const sql_get = "SELECT cl_confirmed_cases FROM county_level WHERE cl_date = ? AND cl_county = ? AND cl_state = ?";

  db.query(sql_get,[date, county, state], (err, results, fields) => {
    if(err) throw err;
    //console.log(results);
    res.send(results);
  });
});

// ************ apis to fetch county level vaccination data ******************* //

// api to fetch county level cases
app.get('/get_county_level_vaccination/:cl_date/:cl_state/:cl_county', (req, res) => {

  var date = req.params.cl_date;
  var state = req.params.cl_state;
  var county = req.params.cl_county;
  
  const sql_get = "SELECT cv_total, cv_category FROM county_level_vaccination\
                   WHERE cv_date = ? AND cv_county = ? AND cv_state = ? AND cv_category = 'complete'";

  db.query(sql_get,[date, county, state], (err, results, fields) => {
    if(err) throw err;
    //console.log(results);
    res.send(results);
  });
});


app.listen(PORT, () => {
  console.log(`server listening on ${PORT}`);
});