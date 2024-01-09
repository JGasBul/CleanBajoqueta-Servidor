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
    var sql = "SELECT * FROM usuariomedicion a INNER JOIN medicion b ON b.idMedicion LIKE CONCAT('%' + a.idMedicion + '%') AND a.email LIKE '" + email + "' LIMIT " + limit + "";
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

/**
 * Genera 100 mediciones alrededor de la universidad
 * Genera 100 mediciones alrededor de la universidad
 *
 * no response value expected for this operation
 **/
exports.fakeMed = function () {
  return new Promise(function (resolve, reject) {
    var upv_location = [{
      'latitud': 38.996254, 'longitud': -0.165665
    }]
    var mappoints = [];
    for (let index = 0; index < 100; index++) {
      mappoints.push(randomGeo(upv_location[0], 2000));
    }
    console.log(mappoints);
    mappoints.forEach(point => {
      var sql = "INSERT INTO medicion (idContaminante, instante, valor, latitud, longitud, temperatura) VALUES (4, '" + require('moment')().format('YYYY-MM-DD HH:mm:ss') + "', "+ getRandomArbitrary(0, 101) +", " + point.latitud + ", " + point.longitud + ", "+getRandomArbitrary(20, 45)+")";
      con.query(sql, function (err, result) {
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
    resolve();
  });
}

/**
 * Recoger mediciones en una zona en especifico
 * Recoger mediciones en una zona en especifico
 *
 * latitud String 
 * longitud String 
 * returns List
 **/
exports.getMedZone = function (latitud, longitud) {
  return new Promise(function (resolve, reject) {
    console.log("Longitud: " + longitud);
    console.log("Longitud: " + latitud);
    // Ordenada por distancia
    //var sql = "SELECT *, ( 6371 * acos(cos(radians(" + latitud + ")) * cos(radians(latitud)) * cos(radians(longitud) - radians(" + longitud + ")) + sin(radians(" + latitud + ")) * sin(radians(latitud)))) AS distance FROM medicion WHERE instante > '"+ require('moment')().format('YYYY-MM-DD 00:00:00') +"' HAVING distance < 1 ORDER BY distance limit 100";
    //Ordenada por ultima añadida
    var sql = "SELECT *, ( 6371 * acos(cos(radians(" + latitud + ")) * cos(radians(latitud)) * cos(radians(longitud) - radians(" + longitud + ")) + sin(radians(" + latitud + ")) * sin(radians(latitud)))) AS distance FROM medicion WHERE instante > '"+ require('moment')().format('YYYY-MM-DD 00:00:00') +"' ORDER BY idMedicion limit 100";
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

//Create random lat/long coordinates in a specified radius around a center point
function randomGeo(center, radius) {
  var y0 = center.latitud;
  var x0 = center.longitud;
  var rd = radius / 111300; //about 111300 meters in one degree

  var u = Math.random();
  var v = Math.random();

  var w = rd * Math.sqrt(u);
  var t = 2 * Math.PI * v;
  var x = w * Math.cos(t);
  var y = w * Math.sin(t);

  var newlat = y + y0;
  var newlon = x + x0;

  return {
    'latitud': newlat.toFixed(5),
    'longitud': newlon.toFixed(5)
  };
}

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}