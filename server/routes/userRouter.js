const express = require("express");
const userController = require("../controller/userController");

const router = express.Router();

// add GET request to username and profile pic?
router.post(
  "/",
  userController.getUserInfo,
  (req, res) => {
    res.status(200).json(res.locals.userInfo);
  }
);

// add new user to user table if they inputted a unique username
router.post(
  "/create",
  userController.getUser,
  userController.createUser,
  (req, res) => {
    res.locals.created === true
      ? res.sendStatus(200)
      : res.status(201).json("that username is already taken!");
    /*
    response 200
  */
  }
);

// get user's row from user db
router.post(
  "/login",
  userController.getUser,
  userController.checkPassword,
  (req, res) => {
    // if the user exists and their password was authenticated, then return the user's info from db

    if (res.locals.exists && res.locals.user) {
      return res.status(200).json(res.locals.user);
    }
    // otherwise notify user that username or password was incorrect
    else {
      return res.status(200).json("username or password was incorrect");
    }

    /*
      response:
      {
        username:
        password:
        profilePic:
      }
      the values will be null if user does not exist
  */
  }
);

module.exports = router;
