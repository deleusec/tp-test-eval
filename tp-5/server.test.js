const request = require('supertest');
const app = require('./server');

describe('POST /submit', () => {
    it('devrait accepter une soumission de formulaire valide', async () => {
        const response = await request(app)
            .post('/submit')
            .send({ name: 'John Doe', email: 'john@example.com' });
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('message', 'Formulaire reçu!');
    });

    it('devrait rejeter une soumission de formulaire invalide', async () => {
        const response = await request(app)
            .post('/submit')
            .send({ name: '', email: '' });
        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty('error', 'Nom et email sont requis');
    });
});