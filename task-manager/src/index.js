require('dotenv').config();

const express = require('express');
require('./db/mongoose');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
  console.log(`App is up on http://localhost:${port}`);
});

const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

const myFunc = async () => {
  const token = jwt.sign({ _id: 'abc123' }, secret, {
    expiresIn: '7 days',
  });
  const data = await jwt.verify(token, secret);
  console.log('data >>>>', data);
};

myFunc();
