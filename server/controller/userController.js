const db = require('../models/buddyModel');

const userController = {};

userController.getUserInfo = async (req, res, next) => {
  try {
    const {username} = req.body;

    //find all info with username
    const queryString = `SELECT * FROM users WHERE username = $1`;
    const results = await db.query(queryString, [username])
  
    const profilePicIndex = results.rows[0].profilepic;
    //saving whole object for now
    res.locals.userInfo = profilePicIndex;
    return next();//okkie :pepe-claps: lol
  } catch (err) {
    return next({
      log: `userController.getUserInfo ERROR: ` + err,
      message: {
        err: `Error getting info`,
      },
    });
  }
};

// create a new user in the users table
userController.createUser = async (req, res, next) => {
  try {
    // if user is retrieved from db, then do not create user
    if (res.locals.user !== false) {
      res.locals.created = false;
      return next();
    }
    const { username, password, profilepic } = req.body; //grabbing responses from post and deconstructing
    

    //add user info to the users table
    const queryString = `INSERT INTO users (username, password, profilepic) VALUES ($1, $2, $3)`;
    const values = [username, password, profilepic];
    const newQuery = await db.query(queryString, values);

    //find last user_id that we just added
    const queryUserId = `SELECT _id FROM users WHERE _id = (SELECT MAX(_id) FROM users)`;
    const userQuery = await db.query(queryUserId);

    // add the username as the teamname to teams table
    const queryStrTeams = `INSERT INTO teams (name, user_id) VALUES ($1, $2)`;
    const teamQuery = await db.query(queryStrTeams, [username, userQuery.rows[0]["_id"]]);
    
    res.locals.created = true;

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
userController.getUser = async (req, res, next) => {
  try {
    // received request body
    const { username, password } = req.body;
    
    // grab all columns if the username and passwords match
    const queryString = `SELECT * FROM users WHERE username = $1 and password = $2`;
    const values = [username, password];
    const result = await db.query(queryString, values);

    const picture = result.rows.profilepic;
    console.log('picture', picture)

    if (!result || result.rows.length === 0) {
      // no users were found with the desired username/password
      res.locals.user = false;
      res.locals.exists = false;
    } else {
      res.locals.user = result.rows[0]; // user is found , set res.locals.user to user info
      res.locals.exists = true;
      res.locals.userpic = picture;
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
    // if the inputted password matches the stored password, its a match!
    res.locals.user.password === req.body.password
      ? (matching = true)
      : (matching = false);
    // save the true/false to password in res.locals
    res.locals.password = matching;
    console.log('leaving create password middleware')
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
