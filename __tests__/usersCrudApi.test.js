const request = require('supertest');
const app = require('../app');

describe('Testing Get Users Endpoint', () => {
  it('Check GET all users method', async () => {
    const res = await request(app).get('/users');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('status', 'success');
    expect(res.body).toHaveProperty('data');
    expect(res.body.data).toBeInstanceOf(Array);
  });

  it('Check GET specific user method', async () => {
    const res = await request(app).get('/user/123');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('status', 'success');
    expect(res.body).toHaveProperty('data');
    expect(res.body.data).toBeInstanceOf(Array);
    expect(res.body.data.length).toEqual(0);
  });
});

describe('Testing Post Users Endpoint (create/update)', () => {
  it('Check create new user method (bad request)', async () => {
    const res = await request(app).post('/createuser').send({});
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('status', 'error');
    expect(res.body).toHaveProperty('message', 'Incorrect request body!');
  });

  it('Check create new user method (good request)', async () => {
    const body = {
      firstName: 'test',
      lastName: 'test',
      birthDate: '2000-04-23',
    };
    const res = await request(app).post('/createuser').send(body);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('status', 'success');
    expect(res.body).toHaveProperty('data');
    expect(res.body.data).toBeInstanceOf(Object);
    expect(res.body.data).toHaveProperty('insertId');
  });

  it('Check update user method (bad request)', async () => {
    const res = await request(app).post('/updateuser').send({});
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('status', 'error');
    expect(res.body).toHaveProperty('message', 'Incorrect request body!');
  });

  it('Check update user method (good request)', async () => {
    const createBody = {
      firstName: 'test',
      lastName: 'test',
      birthDate: '2000-04-23',
    };

    const createdResp = await request(app).post('/createuser').send(createBody);
    expect(createdResp.statusCode).toEqual(200);
    expect(createdResp.body).toHaveProperty('data');
    expect(createdResp.body.data).toHaveProperty('insertId');

    const updateBody = {
      userId: createdResp.body.data.insertId,
      firstName: 'test1',
      lastName: 'test1',
      birthDate: '2000-04-24',
      isActive: false,
    };

    const resDeactivate = await request(app).post('/updateuser').send(updateBody);
    expect(resDeactivate.statusCode).toEqual(200);
    expect(resDeactivate.body).toHaveProperty('status', 'success');
    expect(resDeactivate.body).toHaveProperty('data');
    expect(resDeactivate.body.data).toBeInstanceOf(Object);

    updateBody.isActive = true;
    const resActivate = await request(app).post('/updateuser').send(updateBody);
    expect(resActivate.statusCode).toEqual(200);
    expect(resActivate.body).toHaveProperty('status', 'success');
    expect(resActivate.body).toHaveProperty('data');
    expect(resActivate.body.data).toBeInstanceOf(Object);
  });
});
