const db = require("./db");

module.exports = {
    
    /*
        parameter: nl_date, callback
        returns: data array from the national_level table corresponding to nl_date parameter
    */
    get_national_level: function(nl_date, callback) {
        
        var date = nl_date;
        
        const sql_get = "SELECT * FROM national_level WHERE nl_date = ?";
        
        db.query(sql_get,[date], function (err, res) {

            if (err) {
                return callback(err);
            }
            else{
                return callback(null,res);
            }
        });   
    },

    /*
        parameter: sl_date, sl_state, callback
        returns: data array from the state_level table corresponding to sl_date and sl_state parameters
    */
    get_state_level: function(sl_date, sl_state, callback) {

        var date = sl_date;
        var state = sl_state;
        
        const sql_get = "SELECT * FROM state_level WHERE sl_date = ? AND sl_state = ?";
        
        db.query(sql_get,[date, state], function (err, res) {

            if (err) {
                return callback(err);
            }
            else{
                return callback(null,res);
            }
        });
    },

    /*
        parameter: cl_date, cl_county, cl_state, callback
        returns: data array from the county_level table corresponding to cl_date, cl_county, and cl_state parameters
    */
    get_county_level: function(cl_date, cl_county, cl_state, callback) {

        var date = cl_date;
        var county = cl_county;
        var state = cl_state;
        
        const sql_get = "SELECT * FROM county_level WHERE cl_date = ? AND cl_county = ? AND cl_state = ?";
        
        db.query(sql_get,[date, county, state], function (err, res) {

            if (err) {
                return callback(err);
            }
            else{
                return callback(null,res);
            }
        });
    }
};