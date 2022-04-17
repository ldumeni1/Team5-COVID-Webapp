import axios from 'axios';

//const { response } = require("express");
const getData = function(url) {
    axios.get(url).then(response => {return response.data})
};

export default getData;