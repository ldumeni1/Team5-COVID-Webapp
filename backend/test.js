// testing the apis

// importing backend_api module
const api = require('./backend_api');

api.get_national_level('01/01/01', function(err, res){
    if(err) throw err;
    console.log(res);
});


api.get_state_level('02/02/02','MD', function(err, res){
    if(err) throw err;
    console.log(res);
});


api.get_county_level('03/01/01','Howard','MD', function(err, res){
    if(err) throw err;
    console.log(res);
});

api.get_county_level('03/01/01','Baltimore','MD', function(err, res){
    if(err) throw err;
    console.log(res);
});
