'use strict';

var utils = require('../utils/writer.js');
var User = require('../service/UserService');

module.exports.deleteUser = function deleteUser(req, res, next, email) {
  User.deleteUser(email)
    .then(function (response) {
      response = JSON.parse(response);
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getUser = function getUser(req, res, next, email) {
  User.getUser(email)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.insertUser = function insertUser(req, res, next, body) {
  User.insertUser(body)
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

module.exports.updateUser = function updateUser(req, res, next, body) {
  User.updateUser(body)
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
