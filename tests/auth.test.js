const request = require('supertest');
const app = require('../src/app');

describe('Auth API', () => {
  it('should login successfully with correct credentials', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({ username: 'admin', password: '123456' });
    
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toBe('Login successful');
  });

  it('should fail login with wrong credentials', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({ username: 'admin', password: 'wrong' });

    expect(res.statusCode).toEqual(401);
    expect(res.body.message).toBe('Invalid credentials');
  });
});
