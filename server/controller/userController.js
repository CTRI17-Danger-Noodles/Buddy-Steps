const db = require('../models/buddyModel');

const userController = {};

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

  //? values array initialized with variables
  const values = [username, password, profilepic];
  
  db.query(queryString, values)
    .then((data) => {
      console.log(data.rows);
      //? Data from query stored on res.locals.newUser to pass back to router
      res.locals.newUser = 'created';
    })
  } catch (err) {
    return next(err);
  }
};

// check if user exists in database
userController.getUser = async (req, res, next) => {
  try {
    // console.log(JSON.stringify({ name: 'debug', genre: 'productive', status: 'in progress', startDate: '2023-07-19', endDate: '2023-07-29', users: ['Ky', 'Ry', 'Halia'] }))
    const { username, password } = req.body;
    //! QUERY STRING
    const queryString = `SELECT * FROM users WHERE username = $1 and password = $2`;

    const values = [username, password];
    const result = await db.query(queryString, values);

    if (!result || result.rows.length === 0) {
      // no users were found with the desired username/password
      res.locals.user = false;
      res.locals.exists = false;
    } else {
      res.locals.user = result.rows[0]; // user is found , set res.locals.user to user info
      res.locals.exists = true;
    }
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
    let matching = false;
    res.locals.user.password === req.body.password
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
