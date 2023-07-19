const express = require('express');
const teamController = require('../controller/teamController');

const router = express.Router();

// get information about all tasks associated with a team
router.post('/', teamController.getTasks, (req, res) => {
  res.status(200).json(res.locals.teamTasks);
  /*
    response: 
    {
        tasks: [
            {
                name:
                genre:
                status:
                startDate:
                endDate: 
                users: [array of users]
            },
            {},
            {}
        ]
    } 

  */ 
}); 

module.exports = router;