const { Reservation } = require("../../src/models/reservation");
const mongoose = require('mongoose');

describe("Reservation Validation", () => {
  test("should validate a correct reservation", () => {
    const reservation = new Reservation({
      memberId: new mongoose.Types.ObjectId(),
      gymId: "gym1",
      machineId: "machine1",
      reservationDate: new Date("2024-07-17"),
    });
    const result = reservation.validateReservation();
    expect(result).toBe(true);
  });

  test("should invalidate a reservation with missing memberId", () => {
    const reservation = new Reservation({
      gymId: "gym1",
      machineId: "machine1",
      reservationDate: new Date("2024-07-17"),
    });
    const result = reservation.validateReservation();
    expect(result).toBe(false);
  });

  test("should invalidate a reservation with invalid date", () => {
    const reservation = new Reservation({
      memberId: new mongoose.Types.ObjectId(),
      gymId: "gym1",
      machineId: "machine1",
      reservationDate: new Date("2024-13-01"), 
    });
    const result = reservation.validateReservation();
    expect(result).toBe(false);
  });

  test("should invalidate a reservation with unavailable machine", () => {
    const reservation = new Reservation({
      memberId: new mongoose.Types.ObjectId(),
      gymId: "gym1",
      machineId: "machine2",
      reservationDate: new Date("2024-07-17"),
    });
    const result = reservation.isMachineAvailable(reservation.gymId, reservation.machineId);
    expect(result).toBe(false);
  });
});
