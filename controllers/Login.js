'use strict';
//Logica fake para llamar a la logica del negocio LoginService.JS
var utils = require('../utils/writer.js');
var Login = require('../service/LoginService');

//Obtiene el usuario
//req:Txt, res:Txt, next:Txt, body:Txt --> insertUser()--> JSON
module.exports.getUser = function getUser (req, res, next, email) {
  Login.getUser(email)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

//Inserta usuario en base de datos
//req:Txt, res:Txt, next:Txt, body:Txt --> insertUser()
module.exports.insertUser = function insertUser (req, res, next, body) {
  Login.insertUser(body)
    .then(function (response) {
      if (response["code"]) {
        utils.writeJson(res, response,400);
      }else{
        utils.writeJson(res, response);
      }
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};