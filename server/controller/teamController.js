const db = require('../models/buddyModel');

const teamController = {};

// get information about all tasks associated with a team
teamController.getTasks = (req, res, next) => {
 const { teamName } = req.body;

  //! QUERY STRING
  const queryString = '';

  // values array initialized with variables
  const values = [];
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
};


module.exports = teamController;
