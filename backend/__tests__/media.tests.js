const request = require('supertest');
const app = require('../handler'); // path to your express app
const pool = require('../modules/pool');

// Mock the pool.query method to isolate tests
jest.mock('../modules/pool');

describe('Users API', () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('GET /media/search returns list form open lib api', async () => {
        const response = await request(app).get('/api/media/search?search=harry+potter');
        expect(response.status).toBe(200);
    });

});
