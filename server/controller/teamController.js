const e = require('express');
const db = require('../models/buddyModel');

const teamController = {};

// get information about all tasks associated with a team
teamController.getTasks = async (req, res, next) => {
  try {
    const { teamName } = req.body;

    //find task ids from teamName
    const queryString = 'SELECT * FROM board WHERE team_name = $1';

    // values array initialized with variables
    const values = [teamName];

    const foundTeamTasks = await db.query(queryString, values);
    const arrayFromBoard = foundTeamTasks.rows;
    const taskIds = [];
    arrayFromBoard.forEach((el) => {
      taskIds.push(el['_id']);
    });

    //for each task id, find all the info and also the associated users
    const allTasksAndInfo = [];
    for (const el of taskIds) {
      let queryStr = `SELECT name, (SELECT genre FROM genres WHERE _id = genre_id) AS genre, (SELECT type FROM status where _id = status_id) AS status, start_date, end_date FROM task WHERE _id = $1`;
      const result = await db.query(queryStr, [el]);
      const individualRes = result.rows[0];
      let queryUsers = `SELECT (SELECT username FROM users WHERE _id = user_id) AS username FROM task_user WHERE task_id = $1`;
      const userResults = await db.query(queryUsers, [el]);
      const usernames = userResults.rows.map((row) => row.username);
      individualRes.users = usernames;
      allTasksAndInfo.push(individualRes);
    }

    res.locals.teamTasks = allTasksAndInfo;
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

teamController.createTeam = async (req, res, next) => {
  // use that id to create a new team
  res.locals.created = false;
  try {
    const { username, teamName } = req.body;
    const noEntry = null;

    // find the id
    const queryUserId = `SELECT _id FROM users WHERE username = $1`;

    const userIdQuery = await db.query(queryUserId, [username]);
    const userId = userIdQuery.rows[0]['_id'];
    // use that id to create a new team
    const queryString = `INSERT INTO teams (name, user_id) VALUES ($1, $2)`;
    const values = [teamName, userId];

    await db.query(queryString, values);

    const boardStr = `INSERT INTO board (team_name, task_id) VALUES ($1, $2)`;
    const boardValues = [teamName, noEntry];

    await db.query(boardStr, boardValues);

    res.locals.created = true;
    return next();
  } catch (err) {
    return next({
      log: `teamController.createTeam ERROR: ` + err,
      message: {
        err: `trouble creating team`,
      },
    });
  }
};

teamController.getTeams = async (req, res, next) => {
  try {
    console.log(`entering teamController getTeams`);
    const { username } = req.body;
    console.log('username: ', username);

    //get userId

    const queryUserId = `SELECT _id FROM users WHERE username = $1`;
    const userIdResult = await db.query(queryUserId, [username]);
    const userId = userIdResult.rows[0]._id;

    const queryTeamsAndUsers = `SELECT teams.name, users.username FROM teams INNER JOIN users ON teams.user_id = users._id`;
    // all teams and users
    const teamsAndUsers = await db.query(queryTeamsAndUsers);
    const teamsAndUsersRows = teamsAndUsers.rows;

    const teamsObj = {};
    for (const obj of teamsAndUsersRows) {
      if (!teamsObj[obj.name]) {
        teamsObj[obj.name] = {
          teamName: obj.name,
          users: [],
        };
      }
      if (obj.name !== null && obj.usersname !== null) {
        teamsObj[obj.name].users.push(obj.username);
      }
    }
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
    const userTeams = [];
    for (const teamName of Object.keys(teamsObj)) {
      if (teamsObj[teamName].users.includes(username)) {
        userTeams.push({
          teamName,
          users: teamsObj[teamName].users,
        });
      }
    }
    res.locals.currTeams = userTeams;
    return next();
  } catch (err) {
    return next({
      log: `teamController.getTeam ERROR: ` + err,
      message: {
        err: `trouble retrieving team`,
      },
    });
  }
};

module.exports = teamController;
