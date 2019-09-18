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

// const jwt = require('jsonwebtoken');

// const myFunc = async () => {
//   const token = jwt.sign({ _id: 'abc123' }, 'thisIsSECRET', {
//     expiresIn: '7 days',
//   });
//   console.log('token >>>>', token);
//
//   const data = jwt.verify(token, 'thisIsSECRET');
//   console.log('data >>>>', data);
// };
//
// myFunc();
