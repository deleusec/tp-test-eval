const request = require('supertest');
const app = require('../app');
const { Member } = require('../models/member');

describe('Member Integration Tests', () => {
    beforeAll(async () => {
        // Connect to the database
        await require('../db').connect();
    });

    afterAll(async () => {
        // Disconnect from the database
        await require('../db').disconnect();
    });

    beforeEach(async () => {
        // Clear the members collection before each test
        await Member.deleteMany({});
    });

    test('should register a new member', async () => {
        const newMember = {
            firstName: 'Jane',
            lastName: 'Doe',
            email: 'jane.doe@example.com',
            password: 'Password123!'
        };
        
        const response = await request(app)
            .post('/api/members')
            .send(newMember)
            .expect(201);
        
        expect(response.body).toHaveProperty('_id');
        expect(response.body.firstName).toBe(newMember.firstName);
        expect(response.body.email).toBe(newMember.email);
        
        const member = await Member.findById(response.body._id);
        expect(member).not.toBeNull();
    });

    test('should not register a member with invalid email', async () => {
        const newMember = {
            firstName: 'Jane',
            lastName: 'Doe',
            email: 'jane.doe.com',
            password: 'Password123!'
        };

        const response = await request(app)
            .post('/api/members')
            .send(newMember)
            .expect(400);
        
        expect(response.body).toHaveProperty('error');
    });
});