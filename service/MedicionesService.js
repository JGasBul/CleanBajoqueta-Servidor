//Sustituir por db_connection.js
'use strict';

var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "bbdd_medioambiente"
});
con.connect(function (err) { if (err) throw err; });



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
    var sql = "INSERT INTO mediciones (value, date) VALUES (" + toSend["value"] + ", '" + toSend["date"] + "')";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted");
      console.log(result);
      var examples = {};
      examples['application/json'] = JSON.stringify(body);
      console.log(body);
      if (Object.keys(examples).length > 0) {
        resolve(examples[Object.keys(examples)[0]]);
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
    con.query("SELECT * FROM mediciones", function (err, result, fields) {
      if (err) throw err;
      var examples = {};
      examples['application/json'] = JSON.stringify(result);
      console.log(examples);
      if (Object.keys(examples).length > 0) {
        resolve(examples[Object.keys(examples)[0]]);
      } else {
        resolve();
      }
    });
  });
}

