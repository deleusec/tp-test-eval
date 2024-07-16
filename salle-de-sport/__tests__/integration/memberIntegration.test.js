const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../../src/app");
const { Member } = require("../../src/models/member");

let server;

describe("Member Integration Tests", () => {
  beforeAll(async () => {
    server = app.listen(4000); // Démarre le serveur sur le port 4000
    await mongoose.connect(`${process.env.MONGODB_METHOD}://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_SERVER_URI}/${process.env.MONGODB_DATABASE}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await server.close(); // Ferme le serveur
  });

  beforeEach(async () => {
    await Member.deleteMany({});
  });

  test("should register a new member", async () => {
    const newMember = {
      firstName: "Jane",
      lastName: "Doe",
      email: "jane.doe@example.com",
      password: "Password123!",
    };

    const response = await request(server)
      .post("/api/members")
      .send(newMember)
      .expect(201);

    expect(response.body).toHaveProperty("_id");
    expect(response.body.firstName).toBe(newMember.firstName);
    expect(response.body.email).toBe(newMember.email);

    const member = await Member.findById(response.body._id);
    expect(member).not.toBeNull();
  });

  test("should not register a member with invalid email", async () => {
    const newMember = {
      firstName: "Jane",
      lastName: "Doe",
      email: "jane.doe.com",
      password: "Password123!",
    };

    const response = await request(server)
      .post("/api/members")
      .send(newMember)
      .expect(400);

    expect(response.body).toHaveProperty("error");
  });
});
