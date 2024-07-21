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

describe("GET /courses", () => {
  it("should return list of courses", async () => {
    const response = await request(app).get("/courses");
    expect(response.status).toBe(200);
    expect(response.body.courses).toBeDefined();
  });
});
