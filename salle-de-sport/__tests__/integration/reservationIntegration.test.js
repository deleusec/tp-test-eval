const request = require('supertest');
const app = require('../app');
const { Member } = require('../models/member');
const { Reservation } = require('../models/reservation');

describe('Reservation Integration Tests', () => {
    beforeAll(async () => {
        // Connect to the database
        await require('../db').connect();
    });

    afterAll(async () => {
        // Disconnect from the database
        await require('../db').disconnect();
    });

    beforeEach(async () => {
        // Clear the reservations and members collection before each test
        await Reservation.deleteMany({});
        await Member.deleteMany({});
    });

    test('should create a new reservation for a member', async () => {
        const member = new Member({
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@example.com',
            password: 'Password123!'
        });
        await member.save();

        const newReservation = {
            memberId: member._id.toString(),
            gymId: 'gym1',
            machineId: 'machine1',
            reservationDate: '2024-07-17'
        };
        
        const response = await request(app)
            .post('/api/reservations')
            .send(newReservation)
            .expect(201);
        
        expect(response.body).toHaveProperty('_id');
        expect(response.body.memberId).toBe(newReservation.memberId);
        expect(response.body.gymId).toBe(newReservation.gymId);

        const reservation = await Reservation.findById(response.body._id);
        expect(reservation).not.toBeNull();
    });

    test('should not create a reservation with an invalid date', async () => {
        const member = new Member({
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@example.com',
            password: 'Password123!'
        });
        await member.save();

        const newReservation = {
            memberId: member._id.toString(),
            gymId: 'gym1',
            machineId: 'machine1',
            reservationDate: '2024-13-01'
        };

        const response = await request(app)
            .post('/api/reservations')
            .send(newReservation)
            .expect(400);
        
        expect(response.body).toHaveProperty('error');
    });
});