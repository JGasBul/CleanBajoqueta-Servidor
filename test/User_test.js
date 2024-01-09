let should = require('chai').should(),
  expect = require('chai').expect,
  supertest = require('supertest'),
  api = supertest('http://localhost:8080')

var response;
var body;


const call_post_api = async function (request_body) {
  return api.post('/user/insertUser')
    .send(request_body);
}

const call_get_api = async function (request_header) {
  return api.get('/user/getUserByEmail')
    .set('email', request_header);
}

const call_put_api = async function (request_body, request_header) {
  return api.put('/user/updateUserByEmail')
    .send(request_body).set('email', request_header);
}

const call_delete_api = async function (request_header) {
  return api.delete('/user/deleteByEmail')
    .set('email', request_header);
}

describe('Test sobre el controlador y la logica de negocio de Ususarios', function () {
  describe('Test insertar usuarios', function () {
    before(async function () {
      response = await call_post_api({
        "email": "email@email.com",
        "contraseña": "esternocleidomastoideo",
        "nombreApellido": "Jhon Doe",
        "telefono": "123456789"
      });
      body = response.body;
    });
    it("Response status code is 200", function () {
      expect(response.status).to.equal(200);
    });

    it("Email is in a valid format", function () {
      const responseData = body;

      expect(responseData.email).to.exist.and.to.match(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/);
    });

    it("Contraseña meets the required criteria", function () {
      const responseData = body;

      expect(responseData).to.be.an('object');
      expect(responseData.contraseña).to.exist.and.to.be.a('string')
    });

    it("NombreApellido is a non-empty string", function () {
      const responseData = body;

      expect(responseData).to.be.an('object');
      expect(responseData.nombreApellido).to.exist.and.to.be.a('string').and.to.have.lengthOf.at.least(1, "Value should not be empty");
    });
  });

  describe('Test recuperar usuarios por email', function () {
    before(async function () {
      response = await call_get_api("email@email.com");
      body = response.body;
    });

    it("Response status code is 200", function () {
      expect(response.status).to.equal(200);
    });


    it("Response is an array with at least one element", function () {
      const responseData = body;

      expect(responseData).to.be.an('array').and.to.have.lengthOf.at.least(1);
    });


    it("Email is a non-empty string", function () {
      const responseData = body;

      expect(responseData).to.be.an('array');
      responseData.forEach(function (user) {
        expect(user.email).to.be.a('string').and.to.have.lengthOf.at.least(1, "Email should not be empty");
      });
    });


    it("Password is a non-empty string", function () {
      const responseData = body;

      expect(responseData).to.be.an('array');
      responseData.forEach(function (user) {
        expect(user.contraseña).to.be.a('string').and.to.have.lengthOf.at.least(1, "Password should not be empty");
      });
    });


    it("Phone number should be a non-empty string", function () {
      const responseData = body;

      expect(responseData).to.be.an('array');
      responseData.forEach(function (user) {
        expect(user.telefono).to.be.a('string').and.to.have.lengthOf.at.least(1, "Phone number should not be empty");
      });
    });
  });
  describe('Test actualizar usuarios', function () {
    before(async function () {
      response = await call_put_api({
        "email": "newEmail@email.com",
        "contraseña": "newPass",
        "nombreApellido": "New Jhon Doe",
        "telefono": "987654321"
      }, "email@email.com");
      body = response.body;
    });

    it("Response status code is 200", function () {
      expect(response.status).to.equal(200);
    });


    it("Email is in a valid format", function () {
      const responseData = body;
      const email = responseData.email;

      expect(email).to.match(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/);
    });


    it("Contraseña should not be empty", function () {
      const responseData = body;

      expect(responseData).to.be.an('object');
      expect(responseData.contraseña).to.exist.and.not.to.be.empty;
    });
  });
  describe('Test eliminar usuarios', function () {
    before(async function () {
      response = await call_delete_api("newEmail@email.com");
      body = response.body;
    });

    it("Response status code is 200", function () {
      expect(response.status).to.equal(200);
    });

    it("Field count is a non-negative integer", function () {
      const responseData = body;

      expect(responseData.fieldCount).to.be.a('number');
      expect(responseData.fieldCount).to.be.at.least(0);
    });


    it("The affectedRows should be a non-negative integer", function () {
      const responseData = body;

      expect(responseData.affectedRows).to.exist.and.to.be.a('number');
      expect(responseData.affectedRows).to.be.at.least(0, "Value should be non-negative");
    });


    it("The insertId should be a non-negative integer", function () {
      const responseData = body;

      expect(responseData).to.be.an('object');
      expect(responseData.insertId).to.exist.and.to.be.a('number');
      expect(responseData.insertId).to.be.at.least(0, "Value should be non-negative");
    });

  });
});