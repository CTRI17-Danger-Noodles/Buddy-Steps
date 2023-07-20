const express = require('express');
const teamController = require('../controller/teamController');

const router = express.Router();

// get information about all tasks associated with a team based on team name
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

// add new team to db
router.post('/new', teamController.createTeam, (req, res) => {
    return res.sendStatus(200);
})

// get all teams that a user is a part of, and also include an users array of other team members
router.post('/current', teamController.getTeams, (req, res) => {
    return res.status(200).json(res.locals.currTeams);
})

module.exports = router;