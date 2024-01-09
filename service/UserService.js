'use strict';
var con = require('../bbdd/db_connection.js');

/**
 * Eliminar usuario filtrado por ID
 * Eliminar usuario filtrado por ID
 *
 * email String 
 * returns List
 **/
exports.deleteUser = function (email) {
  return new Promise(function (resolve, reject) {
    var query = "DELETE FROM usuario WHERE  email='" + email + "'";
    console.log(query);
    con.query(query, function (err, result, fields) {
      if (err) throw err;
      var jsonToSend = {};
      jsonToSend['application/json'] = JSON.stringify(result);
      if (Object.keys(jsonToSend).length > 0) {
        resolve(jsonToSend[Object.keys(jsonToSend)]);
      } else {
        resolve();
      }
    });
  });
}

/**
 * Recoger todos los usuarios
 * Recoger todos los usuarios
 *
 * returns List
 **/
exports.getAllUsers = function () {
  return new Promise(function (resolve, reject) {
    var query = "SELECT * FROM usuario a LEFT JOIN telefono b ON a.email = b.email";
    console.log(query);
    con.query(query, function (err, result, fields) {
      if (err) throw err;
      var jsonToSend = {};
      jsonToSend['application/json'] = JSON.stringify(result);
      if (Object.keys(jsonToSend).length > 0) {
        resolve(jsonToSend[Object.keys(jsonToSend)]);
      } else {
        resolve();
      }
    });
  });
}

/**
 * Comprobar si usuario existe
 * Comprobar si usuario existe
 *
 * email String 
 * returns List
 **/
exports.getUser = function (email) {
  return new Promise(function (resolve, reject) {
    var query = "SELECT * FROM usuario WHERE email = '" + email + "'";
    console.log(query);
    con.query(query, function (err, result, fields) {
      if (err) throw err;
      var jsonData = {};
      jsonData = result;
      if (Object.keys(jsonData).length > 0) {
        var query = "SELECT * FROM telefono WHERE email = '" + email + "'";
        con.query(query, function (err, result, fields) {
          if (err) throw err;
          jsonData[0]['imagen'] = Buffer.from(jsonData[0]['imagen'], 'base64').toString();
          jsonData[0]["telefono"] = result[0]["telefono"]
          var jsonToSend = {};
          jsonToSend['application/json'] = JSON.stringify(jsonData);
          if (Object.keys(jsonToSend).length > 0) {
            resolve(jsonToSend[Object.keys(jsonToSend)[0]]);
          } else {
            resolve();
          }
        });
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
    var query = "INSERT INTO usuario (email, contraseña, nombreApellido, imagen) VALUES ('" + toSend["email"] + "', '" + toSend["contraseña"] + "', '" + toSend["nombreApellido"] + "', '" + toSend["imagen"] + "')";
    console.log(query);
    con.query(query, function (err, result) {
      if (err) {
        console.log("Mysql error " + err)
        resolve(err);
        //throw err;
      } else {
        console.log("1 record inserted");
        var jsonToSend = {};
        jsonToSend['application/json'] = JSON.stringify(body);
        if (Object.keys(jsonToSend).length > 0) {
          var query = "INSERT INTO telefono (email, telefono) VALUES ('" + toSend["email"] + "', '" + toSend["telefono"] + "')";
          con.query(query, function (err, result) {
            if (err) {
              console.log("Mysql error " + err)
              resolve(err);
              //throw err;
            } else {
              console.log("1 record inserted");
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

/**
 * Actualizar un usuario ya creado
 * Actualizar un usuario ya creado
 *
 * body Actualizar un usuario ya creado
 * returns newUser
 **/
exports.updateUser = function (body, email) {
  return new Promise(function (resolve, reject) {
    let query = "";
    var telefono = false;
    var jsonBody = JSON.stringify(body);
    var toSend = JSON.parse(jsonBody);

    if (toSend["email"]) {
      console.log("Entro dentro de email");
      query += `email = '${toSend["email"]}',`
    } if (toSend["contraseña"]) {
      console.log("Entro dentro de contraseña");
      query += `contraseña = '${toSend["contraseña"]}',`
    } if (toSend["rol"]) {
      console.log("Entro dentro de rol");
      query += `rol = '${toSend["rol"]}',`
    } if (toSend["nombreApellido"]) {
      console.log("Entro dentro de nombreApellido");
      query += `nombreApellido = '${toSend["nombreApellido"]}',`
    } if (toSend["imagen"]) {
      console.log("Entro dentro de imagen");
      query += `imagen = '${toSend["imagen"]}',`
    } if (toSend["verificado"]) {
      console.log("Entro dentro de verificado");
      query += `verificado = '${toSend["verificado"]}',`
    } if (toSend["token"]) {
      console.log("Entro dentro de token");
      query += `token = '${toSend["token"]}',`
    } if (toSend["telefono"]) {
      telefono = true;
    }
    var correctQuery = query.substring(0, query.length - 1);
    //Cambiar todas las queries a esta forma que queda mas bonito
    let newUser = `UPDATE usuario SET ${correctQuery} WHERE email = '${email}'`;
    console.log(newUser);
    con.query(newUser, function (err, result) {
      if (err) {
        console.log("Mysql error " + err)
        resolve(err);
        //throw err;
      } else {
        var jsonToSend = {};
        jsonToSend['application/json'] = JSON.stringify(body);
        if (Object.keys(jsonToSend).length > 0) {
          if (telefono) {
            var query = `UPDATE telefono SET telefono = '${toSend["telefono"]}' WHERE email = '${toSend["email"]}'`;
            console.log(query);
            con.query(query, function (err, result) {
              if (err) {
                console.log("Mysql error " + err)
                resolve(err);
                //throw err;
              } else {
                console.log("1 record inserted");
                if (Object.keys(jsonToSend).length > 0) {
                  resolve(jsonToSend[Object.keys(jsonToSend)[0]]);
                } else {
                  resolve();
                }
              }
            });
          } else {
            if (Object.keys(jsonToSend).length > 0) {
              resolve(jsonToSend[Object.keys(jsonToSend)[0]]);
            } else {
              resolve();
            }
          }
        }
      }
    });
  });
}


