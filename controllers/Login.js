'use strict';
//Logica fake para llamar a la logica del negocio LoginService.JS
var utils = require('../utils/writer.js');
var Login = require('../service/LoginService');

module.exports.getUser = function getUser (req, res, next, email) {
  Login.getUser(email)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.insertUser = function insertUser (req, res, next, body) {
  Login.insertUser(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};