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

teamController.createTeam = (req, res, next) => {
    // use that id to create a new team
    try{
     res.locals.created = false;
    const { username, teamName } = req.body;

 // find the id
    const queryUserId = `SELECT _id FROM users WHERE username = $1`;
    
    const userId = db.query(queryUserId, [username], (err,res) => {
        if (err) {
            console.log("Error finding userId")
        } else {
          console.log('user_id found!')
        }
    }); 
        // use that id to create a new team
    const queryString = `INSERT INTO 
                        teams (name, user_id)
                        VALUES ($1, $2)`

    const values = [teamName, userId]; 

    db.query(queryString, values, (err,res) => {
        if (err) {
            console.log("Error creating team")
        } else {
            res.locals.created = true;
        }
    });
    return next();
    } catch(err) {
    return next({
        log: `teamController.createTeam ERROR: ` + err,
        message: {
          err: `trouble creating team`,
        },
      });
    }
}

teamController.getTeams = (req, res, next) => {
  try {
    const { username } = req.body;
//get userId
    const queryTeamsAndUsers = `SELECT teams.name, users.username FROM teams INNER JOIN users ON teams.user_id = users._id`

    const teamsAndUsers = db.query(queryTeamsandUsers, (err,res) => {//get a table of all teams and all users 
        if (err) {
            console.log("Error finding teams and users")
        } else {
          console.log('teams and users found')
        }
    }); 
    
// TABLE TEAMSANDUSERS.rows = [ 
//     { _id: 1, name: backend, username: halia}, {_id: 2, name: backend, username: ky}
// ]

    // // get all teams the inputted user is apart of --- FILTER on RETURNED TABLE to get ONLY teams USER is apart of
    const teamsOfUser = teamsAndUsers.rows.filter( obj =>  obj.username === username).map(obj => {
        const teamName = obj.team;
        const users = teamsAndUsers.rows.filter(obj2 => obj2.team === obj.team).map(obj2 => obj2.username)
        return {teamName, users}
    })
    /*
    response:
      [
        { 
          teamName:
          users: [];
        },
        { 
          teamName:
          users: [];
        },
      ]
    */
  } catch (err) {
    return next({
      log: `teamController.getTeam ERROR: ` + err,
      message: {
        err: `trouble retrieving team`,
      },
    });
  }
}

module.exports = teamController;
