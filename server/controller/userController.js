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
  //? Query string creating a new user by inserting id, username, password, and name into the users table on the database with the username, password, name, and profilepic from req.body
  console.log('Im in userController.createUser')
  const queryString =
    'INSERT INTO users (username, password, name, profilepic) VALUES ($1, $2, $3, $4)';

  //! QUERY STRING
  const queryString = '';

  //? values array initialized with variables
  const values = [username, password, name, profilepic];
  
  db.query(queryString, values)
    .then((data) => {
      console.log(data.rows);
      //? Data from query stored on res.locals.newUser to pass back to router
      res.locals.newUser = 'created';

};

userController.login = (req, res, next) => {
  console.log('Im in userController.login')
  const { username, password } = req.body;
  //! QUERY STRING
  const queryString = '';
      /*
      res.locals.exists = true (if user in db) or false (if user not in db)
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
