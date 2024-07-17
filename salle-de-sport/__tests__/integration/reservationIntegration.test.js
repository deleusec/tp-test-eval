const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../../src/app");
const { Member } = require("../../src/models/member");
const { Reservation } = require("../../src/models/reservation");

describe("Reservation Integration Tests", () => {
  beforeEach(async () => {
    await Reservation.deleteMany({});
    await Member.deleteMany({});
  });

  test("should create a new reservation for a member", async () => {
    const memberId = new mongoose.Types.ObjectId();
    const member = new Member({
      _id: memberId,
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      password: "Password123!",
    });
    await member.save();

    const newReservation = {
      memberId: memberId.toString(),
      gymId: "gym1",
      machineId: "machine1",
      reservationDate: "2024-07-17",
    };

    const response = await request(app)
      .post("/api/reservations")
      .send(newReservation)
      .expect(201);

    expect(response.body).toHaveProperty("_id");
    expect(response.body.memberId).toBe(newReservation.memberId);
    expect(response.body.gymId).toBe(newReservation.gymId);

    const reservation = await Reservation.findById(response.body._id);
    expect(reservation).not.toBeNull();
  });

  test("should not create a reservation with an invalid date", async () => {
    const memberId = new mongoose.Types.ObjectId();
    const member = new Member({
      _id: memberId,
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      password: "Password123!",
    });
    await member.save();

    const newReservation = {
      memberId: memberId.toString(),
      gymId: "gym1",
      machineId: "machine1",
      reservationDate: "2024-13-01",
    };

    const response = await request(app)
      .post("/api/reservations")
      .send(newReservation)
      .expect(400);

    expect(response.body).toHaveProperty("error");
  });
});
