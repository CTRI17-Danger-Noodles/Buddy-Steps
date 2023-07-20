const path = require('path');
const db = require('../models/buddyModel');
// controller object holding all methods.
const taskController = {};
//add the task to the task to table
//link the userid and the task in the task in the table.
taskController.createTask = async function (req, res, next) {
  console.log('entered createTask middleware');
  try {

    // destructuring all info about new task
    // *Note: users will be an array of usernames
    const { name, genre, status, startDate, endDate, users } = req.body;
    // teamName provided through req.query
    const teamName = req.query.teamName;
    console.log('teamName: ', teamName)

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

    const queryId = `SELECT _id FROM task WHERE _id = (SELECT MAX(_id) FROM task)`

    const taskIdObj = await db.query(queryId);
    const taskId = taskIdObj.rows[0]['_id']
    // const taskId = taskIdObj.rows[0]
    // console.log('taskId: ', taskId)

    // in task_user table, add this task_id with each user_id
    // users.forEach(async (el) => { // for each does not like async/await, opted for FOR OF
      for (const el of users) {
      console.log('el: ', el)
      queryConcatStr = `INSERT INTO task_user (task_id, user_id) VALUES ($1, (SELECT _id FROM users WHERE username = $2)) `
      await db.query(queryConcatStr, [taskId, el]);
    }

    console.log('leaving createTask middleware')
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
    console.log('Beginning Update task middleware')
    // destructuring all info about new task
    // *Note: users will be an array of usernames
    const { name, genre, status, startDate, endDate, users } = req.body;
    // teamName provided through req.query
    const teamName = req.query.teamName;

    // inner join task and board where board.teamname = teamname to make a big board
    //in that table we can grab the task based on name
    const queryTask = `SELECT task._id, task.name, board.team_name FROM task INNER JOIN board ON board.task_id = task._id`;

    //find id from this task
    const queryBigTable = db.query(queryTask)
    console.log(queryBigTable)
    //filter huge table to only tasks that involve our teamName
    const tasksOfTeam = queryBigTable.rows
      .filter((obj) => obj.team_name === teamName)
        // filter teamTable to only tasks with that taskname
    const taskId = tasksOfTeam
          .filter((obj2) => obj2.name === name)
          .map((obj2) => {
            return obj2["_id"]}); //return the task._id associated with that name

    // update the task
    const updateTaskQ = `UPDATE task SET name = $1, genre_id = (SELECT _id FROM genre WHERE genre = $2), status_id = (SELECT _id FROM status WHERE status = $3), start_date = $4, end_date = $5 WHERE _id=$6`;

    const values = [name, genre, status, startDate, endDate, taskId[0]];

    db.query(updateTaskQ, values, (error, result) => {
      if (error) {
        console.log('failed to update task');
      } else {
        console.log(`task updated!`);
      }
    });

    let taskCounter = 1;
    let userCounter = 2;
    let queryConcatStr = '';
    const toAddValues = []; //taskId, halia, taskId, kyle, taskid, rylie
    users.forEach((el) => {
      queryConcatStr += `INSERT INTO task_user (task_id, user_id) VALUES (${taskCounter}, (SELECT _id FROM users WHERE username = ${userCounter}))`;
      toAddValues.push(...[taskId, el]);
      (taskCounter += 2), (userCounter += 2);
    });

    db.query(queryConcatStr, toAddValues, (error, result) => {
      if (error) {
        console.log('failed to update tasks with new users');
      } else {
        console.log('task updated with new users!');
      }
    });
    console.log('Leaving updateTask middleware')
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
  console.log('entered delete task middleware')
  try {
    // retrieve task name and teamName
    const { name } = req.body;
    const teamName = req.query.teamName;

    // step 1: find taskId from teamName
    const queryTask = `SELECT task._id, task.name, board.team_name FROM task INNER JOIN board ON board.task_id = task._id`;

    // make a big table from task table and board table
    const queryBigTable = db.query(queryTask, (error, result) => {
      if (error) {
        console.log('failed to retrieve task and board join table');
      } else {
        console.log(`task and board join table retrieved!`);
      }
    });
    //filter big table to only tasks that involve our teamName
    const tasksOfTeam = queryBigTable.rows
      .filter((obj) => obj.board.team_name === teamName)
      .map((obj) => {
        // filter teamTable to only tasks with that taskname
        const taskId = queryBigTable.rows
          .filter((obj2) => obj2.task.name === name)
          .map((obj2) => obj2.task._id); //return the task._id associated with that name
        return taskId;
      });

    //step 2: delete where we have that task_id
    const queryDeleteString = `DELETE FROM task_user WHERE task_id = $1
                             DELETE FROM task WHERE _id = $1
                             DELETE FROM board WHERE task_id = $1
  `;

    await db.query(queryDeleteString, [taskId[0]], (error, result) => {
      if (error) {
        console.log('Task was not deleted successfully');
      } else {
        console.log('Task deleted successfully');
      }
    });
    console.log('leaving delete task middleware')
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
