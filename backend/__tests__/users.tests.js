const request = require('supertest');
const app = require('../handler'); // path to your express app
const pool = require('../modules/pool');

// Mock the pool.query method to isolate tests
jest.mock('../modules/pool');

describe('Users API', () => {

    afterEach(() => {
        jest.clearAllMocks();
    });



    test('GET /users returns first user', async () => {
        pool.query.mockResolvedValueOnce({ rows: [{ id: 1, username: 'alice', email: 'alice@example.com' }] });
        const response = await request(app).get('/api/user');
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ id: 1, username: 'alice', email: 'alice@example.com' });
    });



    test('POST /users creates a new user', async () => {
        pool.query.mockResolvedValueOnce();
        const newUser = { username: 'bob', email: 'bob@example.com' };
        const response = await request(app)
            .post('/api/user')
            .send(newUser);
        expect(response.status).toBe(201);
        expect(response.body).toEqual({ message: 'User created successfully' });
    });



    test('POST /users returns 400 if username taken', async () => {
        const error = new Error();
        error.code = '23505';
        error.constraint = 'users_username_key';
        pool.query.mockRejectedValueOnce(error);
        const newUser = { username: 'existinguser', email: 'new@example.com' };
        const response = await request(app)
        .post('/api/user')
        .send(newUser);
        expect(response.status).toBe(400);
        expect(response.body).toEqual({ message: 'Username already taken' });
    });



    test('POST /users returns 400 if empty body', async () => {
        pool.query.mockResolvedValueOnce();
        const newUser = {};
        const response = await request(app)
            .post('/api/user')
            .send(newUser);
        expect(response.status).toBe(500);
        expect(response.body).toEqual({ message: 'Something went wrong' });
    });

});
