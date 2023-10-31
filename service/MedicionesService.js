'use strict';
var con = require('../bbdd/db_connection.js');
//Logica de negocio mediciones

/**
 * Añade un nueva medicion a la base de datos
 * Añade un nueva medicion a la base de datos
 *
 * body Medicion Añade un nueva medicion a la base de datos
 * returns Medicion
 **/
exports.addMed = function (body) {
  return new Promise(function (resolve, reject) {
    var jsonBody = JSON.stringify(body);
    var toSend = JSON.parse(jsonBody);
    console.log(toSend);
    var sql = "INSERT INTO medicion (idContaminante, instante, valor, latitud, longitud, temperatura) VALUES (" + toSend["idContaminante"] + ", '" + toSend["instante"] + "', " + toSend["valor"] + ", " + toSend["latitud"] + ", " + toSend["longitud"] + ", " + toSend["temperatura"] + ")";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted");
      console.log(result);
      var jsonToSend = {};
      jsonToSend['application/json'] = JSON.stringify(body);
      console.log(body);
      if (Object.keys(jsonToSend).length > 0) {
        resolve(jsonToSend[Object.keys(jsonToSend)[0]]);
      } else {
        resolve();
      }
    });
  });

}

/**
 * Recoger mediciones guardadas
 * Recoger mediciones guardadas
 *
 * returns List
 **/
exports.getMed = function () {
  return new Promise(function (resolve, reject) {
    con.query("SELECT * FROM medicion", function (err, result, fields) {
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

