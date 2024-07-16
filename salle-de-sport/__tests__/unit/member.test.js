const { validateMember } = require('../models/member');

describe('Member Validation', () => {
    test('should validate a correct member', () => {
        const member = {
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@example.com',
            password: 'Password123!'
        };
        const result = validateMember(member);
        expect(result).toBe(true);
    });

    test('should invalidate a member with missing firstName', () => {
        const member = {
            lastName: 'Doe',
            email: 'john.doe@example.com',
            password: 'Password123!'
        };
        const result = validateMember(member);
        expect(result).toBe(false);
    });

    test('should invalidate a member with invalid email', () => {
        const member = {
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe.com',
            password: 'Password123!'
        };
        const result = validateMember(member);
        expect(result).toBe(false);
    });

    test('should invalidate a member with short password', () => {
        const member = {
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@example.com',
            password: 'Pass1'
        };
        const result = validateMember(member);
        expect(result).toBe(false);
    });
});