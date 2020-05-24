const path = require('path');

require('dotenv').config({
  path:
    process.env.NODE_ENV === 'PROD'
      ? path.resolve(__dirname, '../production.env')
      : path.resolve(__dirname, '../.env'),
});

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
