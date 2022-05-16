const mysql = require("mysql");
const csv = require('csvtojson');
const papa = require('papaparse');
const {StringStream} = require("scramjet");
const request = require("request");

// connecting to MySql server
const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '5y5t3m100', // update me
});


conn.connect((err) => {
  if (err) {
    console.log("Database Connection Failed !!!", err);
  }
});

// creating the database
function create_db()
{
  const create_db = "CREATE DATABASE IF NOT EXISTS team5_webapp;"
  conn.query(create_db, (err, result) => {
    if(err)
      console.log(err);
  })

  const use_db = "USE team5_webapp;"
  conn.query(use_db, (err, result) => {
    if(err)
      console.log(err);
  })
}

// creates national_level table
function create_national()
{
  const create_national = "CREATE TABLE IF NOT EXISTS national_level( \
    nl_date CHAR(10) NOT NULL, \
    nl_cases int, \
    nl_deaths int,\
    PRIMARY KEY (nl_date));"

  conn.query(create_national, (err, result) => {
    if(err)
      console.log(err);
  })

    // papaparse setup
    const options = {delimiter: ",", download: true, header: true};
    
    const dataStream = request.get("https://raw.githubusercontent.com/nytimes/covid-19-data/master/live/us.csv");
    const parseStream = papa.parse(papa.NODE_STREAM_INPUT, options);
    
    dataStream.pipe(parseStream);
    
    // storing the data in an array
    let national_json = [];
    parseStream.on("data", chunk => {
      national_json.push(chunk);
    });

    parseStream.on("finish", () => {

      var n_date, n_cases, n_deaths; 
    
      console.log("inserting national level infection data...");
      for(var i = 0; i < national_json.length; i++)
      {
          n_date = national_json[i].date || 'null';
          n_cases = national_json[i].cases || null;
          n_deaths = national_json[i].deaths || null;
          
          const insert_data = "INSERT INTO national_level (nl_date, nl_cases, nl_deaths) VALUES (?, ?, ?);"
  
          conn.query(insert_data, [n_date, n_cases, n_deaths], (err, result) => {
            if(err && err.code != 'ER_DUP_ENTRY')
              console.log(err);
          })
      }
      console.log("national level infection data inserted!");
    });
}

// creates state_level table
function create_state()
{
  const create_state = "CREATE TABLE IF NOT EXISTS state_level( \
    sl_date CHAR(10) NOT NULL, \
    sl_state CHAR(40) NOT NULL, \
    sl_fips int, \
    sl_cases int, \
    sl_deaths int, \
    PRIMARY KEY (sl_date, sl_state));"

  conn.query(create_state, (err, result) => {
    if(err)
      console.log(err);
  })

  // papaparse setup
  const options = {delimiter: ",", download: true, header: true};
    
  const dataStream = request.get("https://raw.githubusercontent.com/nytimes/covid-19-data/master/live/us-states.csv");
  const parseStream = papa.parse(papa.NODE_STREAM_INPUT, options);
  
  dataStream.pipe(parseStream);
  
  // storing the data in an array
  let state_json = [];
  parseStream.on("data", chunk => {
    state_json.push(chunk);
  });
  
  // inserting the data into sql table
  parseStream.on("finish", () => {

    var s_date, s_state, s_fips, s_cases, s_deaths;
    
    console.log("inserting state level infection data...");

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
          if(err && err.code != 'ER_DUP_ENTRY')
            console.log(err);
        })
    }
    console.log("state level infection data inserted!");
  });
}

// creates county_level table
function create_county()
{  
  const create_county = "CREATE TABLE IF NOT EXISTS county_level( \
    cl_date CHAR(10) NOT NULL, \
    cl_county CHAR(40) NOT NULL, \
    cl_state CHAR(40) NOT NULL, \
    fips int, \
    cl_cases int, \
    cl_deaths int, \
    PRIMARY KEY (cl_date, cl_county, cl_state));"

  conn.query(create_county, (err, result) => {
    if(err)
      console.log(err);
  })

   // papaparse setup
   const options = {delimiter: ",", download: true, header: true};
    
   const dataStream = request.get("https://raw.githubusercontent.com/nytimes/covid-19-data/master/live/us-counties.csv");
   const parseStream = papa.parse(papa.NODE_STREAM_INPUT, options);
   
   dataStream.pipe(parseStream);
   
   // storing the data in an array
   let county_json = [];
   parseStream.on("data", chunk => {
    county_json.push(chunk);
   });

  // inserting the data into sql table
  parseStream.on("finish", () => {

    var c_date, c_county, c_state, c_fips, c_cases, c_deaths;
    
    console.log("inserting county level infection data...");
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
          if(err && err.code != 'ER_DUP_ENTRY')
            console.log(err);
        })
    }
    console.log("county level infection data inserted");
  });
}


// creates county_level vaccination table
function create_county_vaccination()
{  
  const create_county = "CREATE TABLE IF NOT EXISTS county_level_vaccination( \
    cv_date CHAR(10) NOT NULL, \
    cv_county CHAR(40) NOT NULL, \
    cv_state CHAR(40) NOT NULL, \
    cv_category CHAR(40) NOT NULL, \
    cv_fips INT, \
    cv_total FLOAT, \
    PRIMARY KEY (cv_date, cv_county, cv_state, cv_category));"

  conn.query(create_county, (err, result) => {
    if(err)
      console.log(err);
  })

   // papaparse setup
   const options = {delimiter: ",", download: true, header: true};
    
   const dataStream = request.get("https://raw.githubusercontent.com/bansallab/vaccinetracking/main/vacc_data/data_county_current.csv");
   const parseStream = papa.parse(papa.NODE_STREAM_INPUT, options);
   
   dataStream.pipe(parseStream);
   
   // storing the data in an array
   let countyv_json = [];
   parseStream.on("data", chunk => {
    countyv_json.push(chunk);
   });


   // inserting the data into sql table
  parseStream.on("finish", () => {

    var v_date, v_county, v_state, v_category, v_total, v_fips;

    console.log("inserting county level vaccination data...");
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
          if(err && err.code != 'ER_DUP_ENTRY')
            console.log(err);
        })
    }
    console.log("county level vaccination data inserted!");
  });
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




