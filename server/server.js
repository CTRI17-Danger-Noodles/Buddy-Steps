const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const PORT = 3000;

const userRouter = require('./routes/userRouter');
const taskRouter = require('./routes/taskRouter');
const teamRouter = require('./routes/teamRouter');

// including cookies, urlencoder, and express.json
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded());

// if we need to serve any static files, serve them here:
app.use('/Assets',express.static(path.resolve(__dirname, '../client/assets')));
// insert routes here, please specify specific routes / what they will do:

// ROUTERS
app.use('/api/user', userRouter);
app.use('/api/task', taskRouter);
app.use('/api/team', teamRouter);



// catch all error handler
app.use('/', (req, res) => {
  res.status(404).send('Not Found');
});

// global error handler:
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler has caught an unknown middleware error',
    status: 400,
    message: { err: 'an error occured.' },
  };
  const errorObj = Object.assign(defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

// start server:
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

module.exports = app;
