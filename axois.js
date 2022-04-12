const { response } = require("express");

const getBtn = document.getElementById('get-btn');
const postBtn = document.getElementById('post-btn');

const getData = (url) => {
    axios.get(url).then(response =>
        console.log(response));
};
const sendData = () => {};
axois.post();

getBtn.addEventListener('click', getData);
postBtn.addEventListener('click', sendData);