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

describe("POST /enroll", () => {
  it("should enroll courses successfully", async () => {
    const response = await request(app)
      .post("/enroll")
      .send({
        courses: {
          maths: { day: "1", time: "morning" },
          physics: { day: "2", time: "afternoon" },
          // Autres matières...
        },
      });
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Inscription aux cours réussie!");
  });
  it("should return error for overlapping courses", async () => {
    await request(app)
      .post("/enroll")
      .send({
        courses: {
          maths: { day: "1", time: "morning" },
          physics: { day: "1", time: "morning" }, //Conflit,
        },
      });
    const response = await request(app)
      .post("/enroll")
      .send({ courses: { english: { day: "1", time: "morning" } } });
    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Un cours est déjà inscrit à ce jour.");
  });
});
