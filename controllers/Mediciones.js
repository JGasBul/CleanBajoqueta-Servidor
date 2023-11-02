'use strict';
//Logica fake para llamar a la logica del negocio MedicionesServices.JS
var utils = require('../utils/writer.js');
var Mediciones = require('../service/MedicionesService');

module.exports.addMed = function addMed (req, res, next, body) {
  Mediciones.addMed(body)
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

module.exports.getMed = function getMed (req, res, next) {
  Mediciones.getMed()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
