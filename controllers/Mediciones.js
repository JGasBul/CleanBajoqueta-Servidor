'use strict';

var utils = require('../utils/writer.js');
var Mediciones = require('../service/MedicionesService');

module.exports.addMed = function addMed (req, res, next, body) {
  Mediciones.addMed(body)
    .then(function (response) {
      utils.writeJson(res, response);
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
