const chai = require("chai");
const chaiHttp = require("chai-http");
const { server } = require("../server.js");

chai.use(chaiHttp);

describe("Verificación rutas GET /anime", () => {
  it("La ruta GET sin query params responde con un código 200", (done) => {
    chai
      .request(server)
      .get("/tarea")
      .end((error, response) => {
        chai.expect(response).to.have.status(200);
        done();
      });
  });
});

describe("Verificación rutas POST /anime", () => {
  it("La ruta POST responde con un código 201", (done) => {
    chai
      .request(server)
      .post("/anime")
      .end((error, response) => {
        chai.expect(response).to.have.status(201);
        done();
      });
  });

  it("La ruta POST responde con un código 400 al ser enviada con un body vacío", (done) => {
    chai
      .request(server)
      .post("/anime")
      .end((error, response) => {
        chai.expect(response).to.have.status(400);
        done();
      });
  });
});
