const express = require('express');
const userController = require('../controller/userController');

const router = express.Router();

// router.get('/', userController.getUser, (req, res) => {
//   console.log(res.locals.user);
//   res.status(200).json(res.locals.user);
// }); //? sending back user data to client with 200 status

router.post('/create', userController.getUser, userController.createUser, (req, res) => {
  res.sendStatus(200);
  /*
    response 200
  */ 
}); 

router.post('/login', userController.getUser, (req, res) => {
  res.status(200).json(res.locals.key);
  /*
      response:
      {
        username:
        password:
        profilePic:
      }
      the values will be null if user does not exist
  */
}); 

module.exports = router;
