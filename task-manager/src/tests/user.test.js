const request = require('supertest');
const app = require('../app');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../models/user');

const userOne = {
  _id: new mongoose.Types.ObjectId(),
  name: 'Mike',
  email: 'mike@example.com',
  password: '56what!!!',
  tokens: [
    {
      token: jwt.sign({ _id: this._id }, process.env.JWT_SECRET),
    },
  ],
};

beforeEach(async () => {
  await User.deleteMany();
  await new User(userOne).save();
});

// afterAll(async () => {
//   await User.deleteMany();
// });

test('Should signup a new user', async () => {
  await request(app)
    .post('/users')
    .send({
      name: 'Vasya',
      email: 'vasyok@sho.com',
      password: '12345678',
    })
    .expect(201);
});

test('Should login existing users', async () => {
  await request(app).post('/users/login').send(userOne).expect(200);
});

test('Should not login not existing users', async () => {
  await request(app).post('/users/login').send({ name: 'Test', password: 'LOL' }).expect(400);
});

test('Should get profile for user', async () => {
  await request(app)
    .get('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
});

test('Should not get profile for unauthenticated user', async () => {
  await request(app).get('/users/me').send().expect(401);
});

test('Should delete account for user', async () => {
  await request(app)
    .delete('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(resp => resp.status === 200);
});

test('Should not delete account for unauthenticated use', async () => {
  await request(app).delete('/users/me').send().expect(401);
});
