const path = require('path');

const envs = {
  PROD: path.resolve(__dirname, '../production.env'),
  TEST: path.resolve(__dirname, '../test.env'),
  DEV: path.resolve(__dirname, '../.env'),
};

require('dotenv').config({
  path: envs[process.env.NODE_ENV],
});

const express = require('express');
require('./db/mongoose');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

const app = express();

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

module.exports = app;
