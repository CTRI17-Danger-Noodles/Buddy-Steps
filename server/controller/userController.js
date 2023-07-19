const db = require('../models/buddyModel');

const userController = {};

// create a new user on the users table
userController.createUser = (req, res, next) => {
 if (res.locals.user !== false) {
  res.locals.created = false;
 }
 const { username, password, profilePic } = req.body;

  //! QUERY STRING
  const queryString = '';

  // values array initialized with variables
  const values = [];

  /*
  res.locals.created = true;
  */

};

// check if user exists in database
userController.getUser = (req, res, next) => {
  const { username, password } = req.body;
  //! QUERY STRING
  const queryString = '';
      /*
      res.locals.user = all info on users row
      or false if no user with the req username exists
      */
    
};

// check if the user's password matches the one stored in db
userController.checkPassword = (req, res, next) => {
  const matching = false;

  res.locals.user[password] === req.body.password ? matching = true : matching = false;

  res.locals.password = matching;
  return next();
  // need an error handler?
}

module.exports = userController;
