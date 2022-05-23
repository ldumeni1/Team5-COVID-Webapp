import axios from 'axios';

//const { response } = require("express");
const getData = async (url) => {
    let data = {}
    await axios.get(url).then(response => {data = response})
    return data
};

export default getData;