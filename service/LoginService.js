'use strict';
var con = require('../bbdd/db_connection.js');
//Logica de negocio para Usuarios

/**
 * Comprobar si usuario existe
 * Comprobar si usuario existe
 *
 * email List 
 * returns List
 **/
exports.getUser = function(email) {
  return new Promise(function(resolve, reject) {
    var query = "SELECT email FROM usuario WHERE email = '"+ email +"'";
    console.log(query);
    con.query(query, function (err, result, fields) {
      if (err) throw err;
      var jsonToSend = {};
      jsonToSend['application/json'] = JSON.stringify(result);
      console.log(jsonToSend);
      if (Object.keys(jsonToSend).length > 0) {
        resolve(jsonToSend[Object.keys(jsonToSend)[0]]);
      } else {
        resolve();
      }
    });
  });
}

/**
 * Insertar nuevo usuario
 * Añade un nuevo usuario a la base de datos
 *
 * body User Añade un nuevo usuario a la base de datos
 * returns user
 **/
exports.insertUser = function(body) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "email" : "email@email.com",
  "contraseña" : "esternocleidomastoideo",
  "nombreApellido" : "Jhon Doe",
  "telefono" : "123456789"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}