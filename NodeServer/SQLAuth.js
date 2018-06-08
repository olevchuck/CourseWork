'use strict';

const mysql = require('mysql');
const fs = require("fs");
let content = fs.readFileSync("./credential.json");
let credential = JSON.parse(content);

function get(){
  return  mysql.createConnection(credential)
}

module.exports.get = get;
