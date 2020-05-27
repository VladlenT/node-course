const request = require('supertest');
const app = require('../src/app');
const User = require('../src/models/user');
const Task = require('../src/models/task');
const { userTwo } = require('./fixtures/db');
const { taskOne } = require('./fixtures/db');

const { setupDatabase, userOne, userOneId } = require('./fixtures/db');

beforeEach(setupDatabase);

it('should create task for user', async () => {
  const response = await request(app)
    .post('/tasks')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({ description: 'From test' })
    .expect(201);

  const task = await Task.findById(response.body._id);
  expect(task).not.toBeNull();
  expect(task.completed).toBe(false);
});

it('should return all tasks for user', async () => {
  const response = await request(app)
    .get('/tasks')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .expect(200);

  expect(response.body.length).toBe(2);
});

it('should not delete tasks for other users', async () => {
  await request(app)
    .delete('/tasks/' + taskOne._id)
    .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
    .expect(404);

  const task = Task.findById(taskOne._id);
  expect(task).not.toBeNull();
});
