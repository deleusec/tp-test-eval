const { validateReservation } = require('../models/reservation');

describe('Reservation Validation', () => {
    test('should validate a correct reservation', () => {
        const reservation = {
            memberId: '12345',
            gymId: 'gym1',
            machineId: 'machine1',
            reservationDate: '2024-07-17'
        };
        const result = validateReservation(reservation);
        expect(result).toBe(true);
    });

    test('should invalidate a reservation with missing memberId', () => {
        const reservation = {
            gymId: 'gym1',
            machineId: 'machine1',
            reservationDate: '2024-07-17'
        };
        const result = validateReservation(reservation);
        expect(result).toBe(false);
    });

    test('should invalidate a reservation with invalid date', () => {
        const reservation = {
            memberId: '12345',
            gymId: 'gym1',
            machineId: 'machine1',
            reservationDate: '2024-13-01'
        };
        const result = validateReservation(reservation);
        expect(result).toBe(false);
    });

    test('should invalidate a reservation with unavailable machine', () => {
        const reservation = {
            memberId: '12345',
            gymId: 'gym1',
            machineId: 'machine2', // Suppose that machine2 is unavailable
            reservationDate: '2024-07-17'
        };
        const result = validateReservation(reservation);
        expect(result).toBe(false);
    });
});