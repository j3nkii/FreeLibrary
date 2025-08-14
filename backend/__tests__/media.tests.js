const request = require('supertest');
const app = require('../handler'); // path to your express app
const pool = require('../modules/pool');

// Mock the pool.query method to isolate tests
jest.mock('../modules/pool');

describe('Media API', () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('GET /media/search', async () => {
        const response = await request(app).get('/api/media/search?search=harry+potter');
        expect(response.status).toBe(200);
    });

    test('POST /media/', async () => {
        const response = await request(app).post('/api/media/').send({ olKey: 'OL82563W', userID: 7 });
        expect(response.status).toBe(201);
    });

});
