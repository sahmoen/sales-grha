"use strict";
require("dotenv").config();
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;

function tokenUser(data) {
  return jwt.sign(data, SECRET_KEY);
}

function checkToken(data) {
  return jwt.verify(data, SECRET_KEY);
}

module.exports = {
  tokenUser,
  checkToken,
};
