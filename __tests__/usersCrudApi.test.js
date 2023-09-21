const request = require('supertest');
const app = require('../app');

describe('Testing Get All Users Endpoint', () => {
  it('Check GET all users method', async () => {
    const res = await request(app).get('/users');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('status');
    expect(res.body).toHaveProperty('data');
    expect(res.body.status).toEqual('success');
    expect(res.body.data).toBeInstanceOf(Object);
  });
});
