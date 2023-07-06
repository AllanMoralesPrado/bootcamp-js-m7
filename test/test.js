const chai = require("chai");
const chaiHttp = require("chai-http");
const { server } = require("../server.js");

chai.use(chaiHttp);

let usuarioPruebasID;
let tareaPruebasID;

describe("Verificación ruta /usuario", () => {
  it("La petición con método GET responde con un código 200", (done) => {
    chai
      .request(server)
      .get("/usuario")
      .end((error, response) => {
        chai.expect(response).to.have.status(200);
        done();
      });
  });

  it("La petición con método GET responde en formato json", (done) => {
    chai
      .request(server)
      .get("/usuario")
      .end((error, response) => {
        chai.expect(response).to.be.json;
        done();
      });
  });

  it("La petición con método POST responde con un código 201", (done) => {
    chai
      .request(server)
      .post("/usuario")
      .send({
        nombre: "UsuarioPrueba1",
        correo: "user@test.cl",
      })
      .end((error, response) => {
        chai.expect(response).to.have.status(201);
        done();
      });
  });

  it("La petición con método PUT responde con un código 200", (done) => {
    chai
      .request(server)
      .put("/usuario?id=25")
      .send({
        nombre: "UsuarioPruebaCambiado",
      })
      .end((error, response) => {
        chai.expect(response).to.have.status(200);
        done();
      });
  });

  it("La petición con método DELETE responde con un código 200", (done) => {
    chai
      .request(server)
      .delete("/usuario?id=24")
      .end((error, response) => {
        chai.expect(response).to.have.status(200);
        done();
      });
  });
});

describe("Verificación ruta /tarea", () => {
  it("La petición con método GET responde con un código 200", (done) => {
    chai
      .request(server)
      .get("/tarea")
      .end((error, response) => {
        chai.expect(response).to.have.status(200);
        done();
      });
  });

  it("La petición con método GET responde con un código 200", (done) => {
    chai
      .request(server)
      .get("/tarea")
      .end((error, response) => {
        chai.expect(response).to.be.json;
        done();
      });
  });

  it("La petición con método POST responde con un código 201", (done) => {
    chai
      .request(server)
      .post("/tarea")
      .send({
        titulo: "Tarea de prueba",
        descripcion: "Esto es una tarea de prueba",
        completado: false,
        usuario_id: 20,
      })
      .end((error, response) => {
        chai.expect(response).to.have.status(201);
        done();
      });
  });

  it("La petición con método PUT responde con un código 200", (done) => {
    chai
      .request(server)
      .put("/tarea?id=1")
      .send({
        completado: true,
      })
      .end((error, response) => {
        chai.expect(response).to.have.status(200);
        done();
      });
  });

  it("La petición con método DELETE responde con un código 200", (done) => {
    chai
      .request(server)
      .delete("/tarea?id=20")
      .end((error, response) => {
        chai.expect(response).to.have.status(200);
        done();
      });
  });
});
