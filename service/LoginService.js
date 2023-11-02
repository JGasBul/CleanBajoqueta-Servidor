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
exports.getUser = function (email) {
  return new Promise(function (resolve, reject) {
    var query = "SELECT * FROM usuario WHERE email = '" + email + "'";
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
exports.insertUser = function (body) {
  return new Promise(function (resolve, reject) {
    var jsonBody = JSON.stringify(body);
    var toSend = JSON.parse(jsonBody);
    console.log(toSend);
    var sql = "INSERT INTO usuario (email, contraseña, nombreApellido) VALUES ('" + toSend["email"] + "', '" + toSend["contraseña"] + "', '" + toSend["nombreApellido"] + "')";
    con.query(sql, function (err, result) {
      if (err) {
        console.log("Mysql error " + err)
        resolve(err);
        //throw err;
      } else {
        console.log("1 record inserted");
        console.log(result);
        var jsonToSend = {};
        jsonToSend['application/json'] = JSON.stringify(body);
        console.log(body);
        if (Object.keys(jsonToSend).length > 0) {
          var sql = "INSERT INTO telefono (email, telefono) VALUES ('" + toSend["email"] + "', '" + toSend["telefono"] + "')";
          con.query(sql, function (err, result) {
            if (err) {
              console.log("Mysql error " + err)
              resolve(err);
              //throw err;
            } else {
              console.log("1 record inserted");
              console.log(result);
              console.log(body);
              if (Object.keys(jsonToSend).length > 0) {
                resolve(jsonToSend[Object.keys(jsonToSend)[0]]);
              } else {
                resolve();
              }
            }
          });
        }
      }
    });
  });
}