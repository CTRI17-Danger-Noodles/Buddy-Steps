const db = require('../models/buddyModel');

const teamController = {};

// get information about all tasks associated with a team
teamController.getTasks = (req, res, next) => {
  try {
    const { teamName } = req.body;

    //! QUERY STRING
    const queryString = 'SELECT * FROM tasks WHERE team_name = $1';

    // values array initialized with variables
    const values = [teamName];

    const foundTeamTasks = db.query(queryString, values, (err, res) => {
      if (err) {
        console.log('team not found');
      } else {
        console.log('team found!');
      }
    });

    res.locals.teamTasks = foundTeamTasks;
    return next();

    /*
  array of objects containing each task
  res.locals.teamTasks = [
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
  */
  } catch (err) {
    return next({
      log: `teamController.getTasks ERROR: ` + err,
      message: {
        err: `trouble fetching team tasks`,
      },
    });
  }
};

module.exports = teamController;
