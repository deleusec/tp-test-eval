const { app, startServer } = require("../../server");
const request = require("supertest");

let server;
const PORT = 3001;

beforeAll((done) => {
    server = startServer(PORT);
    server.on('listening', done);
});

afterAll((done) => {
    server.close(done);
});

describe("POST /submit", () => {
  it("should return 200 for valid input", async () => {
    const response = await request(app)
      .post("/submit")
      .send({ name: "John", email: "john@example.com" });
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Formulaire reçu!");
  });
  it("should return 400 for missing fields", async () => {
    const response = await request(app).post("/submit").send({
      name: "",
      email: "john@example.com",
    });
    expect(response.status).toBe(400);
    expect(response.body.error).toBe("Nom et email sont requis");
  });
});
