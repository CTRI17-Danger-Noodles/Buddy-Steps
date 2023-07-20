const path = require('path');
const db = require('../models/buddyModel');
// controller object holding all methods.
const taskController = {};
//add the task to the task to table
//link the userid and the task in the task in the table.
taskController.createTask = async function (req, res, next) {
  try {
    // destructuring all info about new task
    // *Note: users will be an array of usernames
    const { name, status, genre, startDate, endDate, users } = req.body;
    // teamName provided through req.query
    const teamName = req.query.teamName;
    //get the genre id,
    //get the status id,
    const queryString = `INSERT INTO task (name, genre_id, status_id, start_date, end_date) 
  VALUES ($1,
  (SELECT _id FROM genres WHERE genre = $2),
  (SELECT _id FROM status WHERE type = $3),
  $4,
  $5)`;

    const values = [name, genre, status, startDate, endDate];

    const addedRow = await db.query(queryString, values);

    const queryId = `SELECT _id FROM task WHERE _id = (SELECT MAX(_id) FROM task)`;

    const taskIdObj = await db.query(queryId);
    const taskId = taskIdObj.rows[0]['_id'];

    // in task_user table, add this task_id with each user_id
    // users.forEach(async (el) => { // for each does not like async/await, opted for FOR OF
    for (const el of users) {
      console.log('el: ', el);
      queryConcatStr = `INSERT INTO task_user (task_id, user_id) VALUES ($1, (SELECT _id FROM users WHERE username = $2)) `;
      await db.query(queryConcatStr, [taskId, el]);
    }

    //adding to board table
    const boardQuery = `INSERT INTO board (team_name, task_id) VALUES ($1, $2)`;

    await db.query(boardQuery, [teamName, taskId]);

    return next();
  } catch (err) {
    return next({
      log: `taskController.createTask ERROR: ` + err,
      message: {
        err: `trouble creating task`,
      },
    });
  }
};

// this method assumes each team has uniquely named tasks
taskController.updateTask = async function (req, res, next) {
  try {
    console.log('entered update task controller');
    // destructuring all info about new task
    // *Note: users will be an array of usernames
    const { oldname, name, status } = req.body;
    console.log('name submitted: ', name )
    // teamName provided through req.query
    const teamName = req.query.teamName;
    console.log('req.query.teamName', req.query.teamName);
    console.log('req.body.oldname: ', oldname);
    console.log('req.body: ', req.body);

    // inner join task and board where board.teamname = teamname to make a big board
    //in that table we can grab the task based on name
    const queryTask = `SELECT task._id, task.name, board.team_name FROM task INNER JOIN board ON board.task_id = task._id`;
    //find id from this task
    const queryBigTable = await db.query(queryTask); // rows: [
    // [1]     { _id: 92, name: 'dance', team_name: 'Wade' },
    // [1]     { _id: 96, name: 'meditate', team_name: 'Arianna' },
    // [1]     { _id: 97, name: 'Prepare for Talent Show', team_name: 'Ry' }
    // [1]   ],
    console.log('queryBigTable: ', queryBigTable);
    //filter huge table to only tasks that involve our teamName
    const tasksOfTeam = queryBigTable.rows.filter((obj) => {
      return obj.team_name === teamName;
    });
    console.log('tasksOfTeam: ', tasksOfTeam);

    // filter teamTable to only tasks with that taskname
    const taskIdObj = tasksOfTeam.filter((obj2) => {
      return obj2.name === oldname;
    });

    console.log('taskIdObj: ', taskIdObj);

    const taskId = taskIdObj[0]['_id'];
    console.log('taskId: ', taskId);
    let updateTaskQ = '';
    const values = [taskId];
    if (name !== null) {
      // update the task
      updateTaskQ = 'UPDATE task SET name = $2 WHERE _id = $1';
      values.push(name);
    }
    if (status !== null) {
      updateTaskQ =
        'UPDATE task SET status_id = (SELECT _id FROM status WHERE type = $2) WHERE _id = $1';
      values.push(status);
    }

    const statusOrName = await db.query(updateTaskQ, values);

    //update the task_user table
    // for (const el of users) {
    //   queryConcatStr = `INSERT INTO task_user (task_id, user_id) VALUES ($1, (SELECT _id FROM users WHERE username = $2)) `;
    //   await db.query(queryConcatStr, [taskId, el]);
    // }

    return next();
  } catch (err) {
    return next({
      log: `taskController.updateTask ERROR: ` + err,
      message: {
        err: `trouble updating task`,
      },
    });
  }
};

// this method assumes each team has uniquely named tasks
taskController.deleteTask = async function (req, res, next) {
  try {
    // retrieve task name and teamName
    const { name, teamName } = req.body;

    // step 1: find taskId from teamName
    const queryTask = `SELECT task._id, task.name, board.team_name FROM task INNER JOIN board ON board.task_id = task._id`;
    //find id from this task

    const queryBigTable = await db.query(queryTask);

    //filter huge table to only tasks that involve our teamName
    const tasksOfTeam = queryBigTable.rows.filter(
      (obj) => obj.team_name === teamName
    );
    // filter teamTable to only tasks with that taskname
    const taskIdObj = tasksOfTeam.filter((obj2) => {
      return obj2.name === name;
    });
    const taskId = taskIdObj[0]['_id'];
    //step 2: delete where we have that task_id
    const queryDeleteFromTaskUser = `DELETE FROM task_user WHERE task_id = $1`;
    await db.query(queryDeleteFromTaskUser, [taskId]);

    const queryDeleteFromTask = `DELETE FROM task WHERE _id = $1`;
    await db.query(queryDeleteFromTask, [taskId]);

    const queryDeleteFromBoard = `DELETE FROM board WHERE task_id = $1`;
    await db.query(queryDeleteFromBoard, [taskId]);

    return next();
  } catch (err) {
    return next({
      log: `taskController.deleteTask ERROR: ` + err,
      message: {
        err: `trouble deleting task`,
      },
    });
  }
};

module.exports = taskController;
