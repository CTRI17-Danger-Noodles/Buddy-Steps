const express = require('express');
const router = express.Router();

// Import respective controller
const taskController = require('../controller/taskController');

// adds task to team
router.post('/', taskController.createTask, (req, res) => {
  console.log('entered task post router')
  return res.sendStatus(200);
  /*
    response: 200
  */
});

// updates a team's task
router.patch('/', taskController.updateTask, (req, res) => {
  console.log('Entered task patch router')
  return res.sendStatus(200);
  /*
    response: 200
  */
});

// deletes task from team
router.delete('/', taskController.deleteTask, (req, res) => {
  console.log('entered task delete router')
  return res.sendStatus(200);
});

module.exports = router;
