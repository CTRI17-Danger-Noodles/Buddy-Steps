const db = require('../models/buddyModel');

const userController = {};

//^ getUsers method to retrieve user info from db
userController.getUser = (req, res, next) => {
  //? Query string pulling the id, username, password, and name from users table on the database with the username from req.query
  console.log('Im in userController.getUser')
  const queryString =
    'SELECT id, username,password, profilepic, name FROM users WHERE username = $1';

  //? username intialized to desantitize data from req.query object
  const username = req.query.username;

  db.query(queryString, [username])
    .then((data) => {
      //? Data from query stored on res.locals.user to pass back to router
      res.locals.user = data.rows[0];

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

//^ createUsers method to create a new user on the user table from the db
// create a new user on the users table
userController.createUser = (req, res, next) => {

  try {
  if (res.locals.user !== false) {
    res.locals.created = false;
  }
  const { username, password, profilePic } = req.body; //grabbing responses from post and deconstructing


  //! QUERY STRING
  const queryString = `INSERT INTO users (username, password, profilepic) VALUES ($1, $2, $3)`; // updated query


  // values array initialized with variables
  const values = [username, password, profilePic];

  db.query(queryString, values, (err, res) => {
    if (err) {
      console.log('Error creating user: ', err);
      res.locals.created = false;
    } else {
      console.log('Successfully created user');
      res.locals.created = true;
    }
  });
  /*
  res.locals.created = true;
  */
  return next();
} catch (err) {
  return next({
    log: `userController.createUser ERROR: ` + err,
    message: {
      err: `trouble creating user`,
    },
  });
}
};

// check if user exists in database
userController.getUser = (req, res, next) => {
  try {

  const { username, password } = req.body;
  //! QUERY STRING
  const queryString = `SELECT * FROM users WHERE username = $1 and password = $2`;

  const values = [username, password];

  db.query(queryString, values, (err, res) => {
    if (err) {
      //error check
      console.log('Error retrieving user: ', err);
      res.locals.user = false;
    } else {
      if (ResultType.length === 0) {
        // no users were found with the desired username/password
        res.locals.user = false;
      } else {
        res.locals.user = result[0]; // user is found , set res.locals.user to user info
      }
    }
  });
  /*
      res.locals.user = all info on users row
      or false if no user with the req username exists
      */
  return next();
} catch (err) {
  return next({
    log: `userController.getUser ERROR: ` + err,
    message: {
      err: `trouble fetching user`,
    },
  });
}
};

// check if the user's password matches the one stored in db
userController.checkPassword = (req, res, next) => {
  try {
    const matching = false;
    res.locals.user[password] === req.body.password
      ? (matching = true)
      : (matching = false);
    res.locals.password = matching;
    return next();
  } catch (err) {
    return next({
      log: `userController.checkPassword ERROR: ` + err,
      message: {
        err: `Error checking password`,
      },
    });
  }
};


module.exports = userController;
