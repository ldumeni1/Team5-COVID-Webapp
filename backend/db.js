const mysql = require("mysql");
const csv = require('csvtojson');

// connecting to MySql server
const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Anurag#123', // update me
});


conn.connect((err) => {
  if (err) {
    console.log("Database Connection Failed !!!", err);
  } else {
    console.log("connected to Database");
  }
});

// creating the database
function create_db()
{
  const drop_db = "Drop DATABASE IF EXISTS team5_webapp;"
  conn.query(drop_db, (err, result) => {
    if(err)
      console.log(err);
    //else
      //console.log(result);
  })

  const create_db = "CREATE DATABASE team5_webapp;"
  conn.query(create_db, (err, result) => {
    if(err)
      console.log(err);
    //else
      //console.log(result);
  })

  const use_db = "USE team5_webapp;"
  conn.query(use_db, (err, result) => {
    if(err)
      console.log(err);
    //else
      //console.log(result);
  })
}

// creates national_level table
function create_national()
{
  const create_national = "CREATE TABLE IF NOT EXISTS national_level( \
    nl_date CHAR(10), \
    nl_cases int, \
    nl_deaths int);"

  conn.query(create_national, (err, result) => {
    if(err)
      console.log(err);
    //else
      //console.log(result);
  })


  csv()
  .fromFile('./data/us.csv')
  .then(function(national_json){ //when parse finished, result will be emitted here.

    var n_date, n_cases, n_deaths; 
    
    for(var i = 0; i < national_json.length; i++)
    {
        n_date = national_json[i].date || 'null';
        n_cases = national_json[i].cases || null;
        n_deaths = national_json[i].deaths || null;
        
        const insert_data = "INSERT INTO national_level (nl_date, nl_cases, nl_deaths) VALUES (?, ?, ?);"

        conn.query(insert_data, [n_date, n_cases, n_deaths], (err, result) => {
          if(err)
            console.log(err);
          else
            console.log("national level infection data inserted!");
        })
    }
  })
}

// creates state_level table
function create_state()
{
  const create_state = "CREATE TABLE IF NOT EXISTS state_level( \
    sl_date CHAR(10), \
    sl_state CHAR(40), \
    sl_fips int, \
    sl_cases int, \
    sl_deaths int);"

  conn.query(create_state, (err, result) => {
    if(err)
      console.log(err);
    //else
      //console.log(result);
  })


  csv()
  .fromFile('./data/us-states.csv')
  .then(function(state_json){ //when parse finished, result will be emitted here.
   
    var s_date, s_state, s_fips, s_cases, s_deaths;
      
    for(var i = 0; i < state_json.length; i++)
    {
        s_date = state_json[i].date || 'null';
        s_state = state_json[i].state || 'null';
        s_fips = state_json[i].fips || null;
        s_cases = state_json[i].cases || null;
        s_deaths = state_json[i].deaths || null;
        
        const insert_data = "INSERT INTO state_level (sl_date, sl_state, sl_fips, sl_cases, sl_deaths) \
                              VALUES (?, ?, ?, ?, ?);"

        conn.query(insert_data, [s_date, s_state, s_fips, s_cases, s_deaths], (err, result) => {
          if(err)
            console.log(err);
          else
            console.log("state level infection data inserted!");
        })
    }
  })
}

// creates county_level table
function create_county()
{  
  const create_county = "CREATE TABLE IF NOT EXISTS county_level( \
    cl_date CHAR(10), \
    cl_county CHAR(40), \
    cl_state CHAR(40), \
    fips int, \
    cl_cases int, \
    cl_deaths int);"

  conn.query(create_county, (err, result) => {
    if(err)
      console.log(err);
    //else
      //console.log(result);
  })


  csv()
  .fromFile('./data/us-counties.csv')
  .then(function(county_json){ //when parse finished, result will be emitted here.
    
    var c_date, c_county, c_state, c_fips, c_cases, c_deaths;
    
    for(var i = 0; i < county_json.length; i++)
    {
        c_date = county_json[i].date || 'null';
        c_county = county_json[i].county || 'null';
        c_state = county_json[i].state || 'null';
        c_fips = county_json[i].fips || null;
        c_cases = county_json[i].cases || null;
        c_deaths = county_json[i].deaths || null;
        
        const insert_data = "INSERT INTO county_level (cl_date, cl_county, cl_state, fips, cl_cases, cl_deaths) \
                              VALUES (?, ?, ?, ?, ?, ?);"

        conn.query(insert_data, [c_date, c_county, c_state, c_fips, c_cases, c_deaths], (err, result) => {
          if(err)
            console.log(err);
          else
            console.log("county level infection data inserted");
        })
    }
  })
}


// creates county_level vaccination table
function create_county_vaccination()
{  
  const create_county = "CREATE TABLE IF NOT EXISTS county_level_vaccination( \
    cv_date CHAR(10), \
    cv_county CHAR(40), \
    cv_state CHAR(40), \
    cv_category CHAR(40), \
    cv_fips INT, \
    cv_total FLOAT);"

  conn.query(create_county, (err, result) => {
    if(err)
      console.log(err);
    //else
      //console.log(result);
  })

  csv()
  .fromFile('./data/data_county_current.csv')
  .then(function(countyv_json){ //when parse finished, result will be emitted here.
    //console.log(countyv_json);
    
    var v_date, v_county, v_state, v_category, v_total, v_fips;
    
    for(var i = 0; i < countyv_json.length; i++)
    {
        v_date = countyv_json[i].DATE || 'null';
        v_county = countyv_json[i].COUNTY_NAME || 'null';
        v_state = countyv_json[i].STATE_NAME || 'null';
        v_category = countyv_json[i].CASE_TYPE || 'null';
        v_total =  countyv_json[i].CASES || null;
        v_fips =  countyv_json[i].COUNTY || null;

        const insert_data = "INSERT INTO county_level_vaccination (cv_date, cv_county, cv_state, cv_category\
          , cv_fips, cv_total) VALUES (?, ?, ?, ?, ?, ?);"

        conn.query(insert_data, [v_date, v_county, v_state, v_category, v_fips, v_total], (err, result) => {
          if(err)
            console.log(err);
          else
            console.log("county level vaccination data inserted!");
        })
    }
    
  })
}

module.exports = {

create_tables: function()
{
    create_db();
    create_national();
    create_state();
    create_county();
    create_county_vaccination();
}

};




