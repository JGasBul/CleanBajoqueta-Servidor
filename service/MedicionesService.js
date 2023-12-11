'use strict';
var con = require('../bbdd/db_connection.js');
//Logica de negocio mediciones

/**
 * Añade un nueva medicion a la base de datos
 *
 * body Medicion Añade un nueva medicion a la base de datos
 * returns Medicion
 **/

//body(JSON)-> addMed()-> 
exports.addMed = function (body) {
  return new Promise(function (resolve, reject) {
    var jsonBody = JSON.stringify(body);
    var toSend = JSON.parse(jsonBody);
    console.log(toSend);
    var sql = "INSERT INTO medicion (idContaminante, instante, valor, latitud, longitud, temperatura) VALUES (" + toSend["idContaminante"] + ", '" + toSend["instante"] + "', " + toSend["valor"] + ", " + toSend["latitud"] + ", " + toSend["longitud"] + ", " + toSend["temperatura"] + ")";
    var sqlID = "SELECT * FROM medicion ORDER BY idMedicion DESC LIMIT 1";
    con.query(sql, function (err, result) {
      if (err) {
        console.log("Mysql error " + err)
        resolve(err);
        //throw err;
      } else {
        console.log("Record medicion inserted");
        con.query(sqlID, function (err, result) {
          var idMedicion = -1;
          idMedicion = result[0]["idMedicion"];
          if (idMedicion => 0) {
            var sql3 = "INSERT INTO usuariomedicion (email, idMedicion) VALUES ('" + toSend["emailUser"] + "'," + idMedicion.toString() + ")";
            con.query(sql3, function (err, result) {
              if (err) {
                console.log("Mysql error " + err);
                resolve(err);
              } else {
                console.log("Record usuarioMedicion inserted");
                var sql4 = "INSERT INTO sondamedicion (idSonda, idMedicion) VALUES (" + toSend["idSonda"] + "," + idMedicion.toString() + ")";
                con.query(sql4, function (err, result) {
                  if (err) {
                    console.log("Mysql error " + err);
                    resolve(err);
                  } else {
                    var jsonToSend = {};
                    jsonToSend['application/json'] = jsonBody;
                    console.log(body);
                    resolve(jsonToSend[Object.keys(jsonToSend)[0]]);
                  }
                })
              }
            })
          } else {
            resolve();
          }
        })
      }
    });
  });

}

/**
 * Recoger mediciones guardadas
 * Recoger mediciones guardadas
 *
 * email String 
 * limit Integer 
 * returns List
 **/

// getMed()->List(JSON)
exports.getMed = function (email, limit) {
  return new Promise(function (resolve, reject) {
    var sql = "SELECT * FROM usuariomedicion a INNER JOIN medicion b ON b.idMedicion LIKE CONCAT('%' + a.idMedicion + '%') AND a.email LIKE '"+email+"' LIMIT "+limit+"";
    console.log(sql);
    con.query(sql, function (err, result, fields) {
      if (err) throw err;
      var jsonToSend = {};
      jsonToSend['application/json'] = JSON.stringify(result);
      if (Object.keys(jsonToSend).length > 0) {
        resolve(jsonToSend[Object.keys(jsonToSend)[0]]);
      } else {
        resolve();
      }
    });
  });
}

