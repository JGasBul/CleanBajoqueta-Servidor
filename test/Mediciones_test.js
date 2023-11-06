let should = require('chai').should(),
  expect = require('chai').expect,
  supertest = require('supertest'),
  api = supertest('http://localhost:8080'),
  faker = require('faker')

let result

describe('guardar_mediciones', function () {
  it('should respond with redirect on post', function (done) {
    api
      .post('/mediciones/guardar_mediciones')
      .send({
        "idContaminante": 4,
        "instante": "24/08/2023",
        "valor": 123,
        "latitud": 4,
        "longitud": 3,
        "temperatura": 20
      })
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function (err, res) {
        if (err) done(err);
        res.body.should.have.property('idContaminante');
        res.body.should.have.property('instante');
        res.body.should.have.property('valor');
        res.body.should.have.property('latitud');
        res.body.should.have.property('longitud');
        res.body.should.have.property('temperatura');
      });
    done();
  });
})

describe('recuperar_medicions', function () {
  it('should return a 200 response', function (done) {
    api
      .get('/mediciones/recuperar_medicions')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        result = res;
        done()
      })
  })
})