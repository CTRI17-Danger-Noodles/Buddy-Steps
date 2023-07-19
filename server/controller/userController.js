const db = require('../models/buddyModel');

const userController = {};

// //^ getUsers method to retrieve user info from db
// userController.getUser = (req, res, next) => {
//   //? Query string pulling the id, username, password, and name from users table on the database with the username from req.query
//   const queryString =
//     'SELECT id, username,password, profilepic, name FROM users WHERE username = $1';

//   //? username intialized to desantitize data from req.query object
//   const username = req.query.username;

//   db.query(queryString, [username])
//     .then((data) => {
//       //? Data from query stored on res.locals.user to pass back to router
//       res.locals.user = data.rows[0];

//       return next();
//     })
//     .catch((err) => {
//       return next({
//         status: 400,
//         log: `${err}: Error on user.Controller.getUsers`,
//         message: 'Error getting user',
//       });
//     });
// };

// create a new user on the users table
userController.createUser = (req, res, next) => {
  /*
    IF res.locals.user !== false then return message 'username is already taken!'

    ELSE create user in user table
  */
 const { username, password, profilePic } = req.body;
 // console.log('req.body: ', req.body);

  //! QUERY STRING
  const queryString =
    'INSERT INTO users (username, password, name, profilepic) VALUES ($1, $2, $3, $4)';

  // values array initialized with variables
  const values = [username, password, profilepic];

  db.query(queryString, values)
    .then((data) => {
      console.log(data.rows);
      //? Data from query stored on res.locals.newUser to pass back to router
      res.locals.newUser = 'created';
    
      return next();
    })
    .catch((err) => {
      return next({
        status: 400,
        log: `${err}: Error on user.Controller.getUsers`,
        message: 'Error getting user',
      });
    });
};

// check if user exists in database
userController.getUser = (req, res, next) => {
  const { username, password } = req.body;
  //! QUERY STRING
  const queryString =
    'SELECT username, password FROM users WHERE username = $1';
  db.query(queryString, [username])
    .then((data) => {
      if (data.rows[0] === undefined) {
        res.locals.key = 'false';
      } else if (data.rows[0].password === req.body.password) {
        res.locals.key = 'true';
      } else {
        res.locals.key = 'false';
      }
      console.log(res.locals.key);
      return next();
      /*
      res.locals.user = all info on users row
      or false if no user with the req username exists
      */
    })
    .catch((err) => {
      return next({
        status: 400,
        log: `${err}: Error on user.Controller.login`,
        message: 'Username or password is incorrect',
      });
    });
};

module.exports = userController;
