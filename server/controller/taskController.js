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
    const { name, status, genre, startDate, endDate } = req.body;
    // teamName provided through req.query
    const teamName = req.query.teamName;
    console.log('teamName: ', teamName);

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
    // const taskId = taskIdObj.rows[0]
    // console.log('taskId: ', taskId)

    // in task_user table, add this task_id with each user_id
    // users.forEach(async (el) => { // for each does not like async/await, opted for FOR OF
    for (const el of users) {
      console.log('el: ', el);
      queryConcatStr = `INSERT INTO task_user (task_id, user_id) VALUES ($1, (SELECT _id FROM users WHERE username = $2)) `;
      await db.query(queryConcatStr, [taskId, el]);
    }

    console.log('leaving createTask middleware');
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
    // destructuring all info about new task
    // *Note: users will be an array of usernames
    const { name, genre, status, startDate, endDate, users } = req.body;
    // teamName provided through req.query
    const teamName = req.query.teamName;

    // inner join task and board where board.teamname = teamname to make a big board
    //in that table we can grab the task based on name
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

    // update the task
    const updateTaskQ =
      'UPDATE task SET name = $1, genre_id = (SELECT _id FROM genres WHERE genre = $2), status_id = (SELECT _id FROM status WHERE type = $3), start_date = $4, end_date = $5 WHERE _id = $6';

    const values = [name, genre, status, startDate, endDate, taskId];
    const resultsPlease = await db.query(updateTaskQ, values);

    //update the task_user table
    for (const el of users) {
      queryConcatStr = `INSERT INTO task_user (task_id, user_id) VALUES ($1, (SELECT _id FROM users WHERE username = $2)) `;
      await db.query(queryConcatStr, [taskId, el]);
    }

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
    const { name } = req.body;
    const teamName = req.query.teamName;

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
