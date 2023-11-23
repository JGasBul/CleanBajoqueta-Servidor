let should = require('chai').should(),
  expect = require('chai').expect,
  supertest = require('supertest'),
  api = supertest('http://localhost:8080')

var response;
var body;

const call_post_api = async function (request_body) {
  return api.post('/mediciones/guardar_mediciones')
    .send(request_body);
}

const call_get_api = async function (request_header) {
  return api.get('/mediciones/recuperar_medicions/5')
    .set('email', request_header);
}

describe('Test sobre el controlador y la logica de negocio de Mediciones', function () {
  describe('Test insertar medicion', function () {
    before(async function () {
      response = await call_post_api({
        "idContaminante": 4,
        "idSonda": 1,
        "emailUser": "testMediciones@email.com",
        "instante": "24/08/2023",
        "valor": 123,
        "latitud": 4,
        "longitud": 3,
        "temperatura": 20
      });
      body = response.body;
    });
    it("Response status code is 200", function () {
      expect(response.status).to.equal(200);
    });

    it("EmailUser is in a valid email format", function () {
      const responseData = body;

      expect(responseData).to.be.an('object');
      expect(responseData.emailUser).to.exist.and.match(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/);
    });


    it("Instante is in a valid date format", function () {
      //Refinar mas adelante cuando guardemos fecha como dateTime
      const responseData = body;
      expect(responseData.instante).to.be.an('string');
      /*
            expect(responseData).to.be.an('object');
            expect(responseData.instante).to.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/, "Instante is not in a valid date format");
       */
    });


    it("Value is a non-negative number", function () {
      const responseData = body;
      expect(responseData.valor).to.exist.and.to.be.a('number');
      expect(responseData.valor).to.be.at.least(0);
    });
  });

  describe('Test recuperar mediciones por email', function () {
    before(async function () {
      response = await call_get_api("testMediciones@email.com");
      body = response.body;
    });

    it("Response status code is 200", function () {
      expect(response.status).to.equal(200);
    });

    it("Response is an array with at least one element", function () {
      const responseData = body;
      expect(responseData).to.be.an('array').that.is.not.empty;
    });
  });
});

