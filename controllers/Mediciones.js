'use strict';
//Logica fake para llamar a la logica del negocio MedicionesServices.JS
var utils = require('../utils/writer.js');
var Mediciones = require('../service/MedicionesService');

//req:Txt, res:Txt, next:Txt, body:Txt --> addMed()-->JSON
module.exports.addMed = function addMed(req, res, next, body) {
  Mediciones.addMed(body)
    .then(function (response) {
      if (response["code"]) {
        utils.writeJson(res, response, 400);
      } else {
        utils.writeJson(res, response);
      }
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.fakeMed = function fakeMed(req, res, next) {
  Mediciones.fakeMed()
    .then(function (response) {
      if (response["code"]) {
        utils.writeJson(res, response, 400);
      } else {
        utils.writeJson(res, response);
      }
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getMed = function getMed(req, res, next, limit, email) {
  Mediciones.getMed(email, limit)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.lastMed = function lastMed(req, res, next, email) {
  Mediciones.lastMed(email)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getMedZone = function getMedZone (req, res, next, latitud, longitud) {
  Mediciones.getMedZone(latitud, longitud)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
