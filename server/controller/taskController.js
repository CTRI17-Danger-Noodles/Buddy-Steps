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
  const { name, genre, status, startDate, endDate, users } = req.body;
  // teamName provided through req.query
  const teamName = req.query.teamName;
  
  //get the genre id,
  //get the status id,
  const queryString = `INSERT INTO task (name, genre_id, status_id, start_date, end_date) 
  VALUES ($1,
  (SELECT _id FROM genres WHERE genre = $2),
  (SELECT _id FROM status WHERE type = $3),
  $4,
  $5)`

  const values = [name, genre, status, startDate, endDate]

  const addedRow = await db.query(queryString, values, (err, res) => {
    if (err) {
      console.log('failed to create task')
    } else {
      console.log('task created!')
    }
  })

  const taskId = addedRow[0]._id

  // const queryTask = `SELECT _id FROM task WHERE name=$1`

  // //find id from this task
  // const taskId = db.query(queryTask, name, (err, res) => {
  //   if (err) {
  //     console.log('failed to retrieve task id')
  //   } else {
  //     console.log(`task id received!`)
  //   }


  // in task_user table, add this task_id with each user_id
  let taskCounter = 1
  let userCounter = 2
  let queryConcatStr = ''
  const toAddValues = []; //taskId, halia, taskId, kyle, taskid, rylie
  users.forEach(el => {
    queryConcatStr += `INSERT INTO task_user (task_id, user_id) VALUES (${taskCounter}, (SELECT _id FROM users WHERE username = ${userCounter}))`
    toAddValues.push(...[taskId, el])
    taskCounter+=2,
    userCounter+=2
  })

  db.query(queryConcatStr, toAddValues, (err, res) => {
    if (err) {
      console.log('failed to create task with users')
    } else {
      console.log('task with users created!')
    }
  })
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



taskController.updateTask = async function (req, res, next) {
  try {
  // destructuring all info about new task 
  // *Note: users will be an array of usernames
  const { name, genre, status, startDate, endDate, users } = req.body;
  // teamName provided through req.query
  const teamName = req.query.teamName;
  // find the task by it's name
  const queryTask = `SELECT _id FROM task WHERE name=$1`
  //find id from this task
  const taskId = db.query(queryTask, name, (err, res) => {
    if (err) {
      console.log('failed to retrieve task id to update')
    } else {
      console.log(`task id received to update!`)
    }
  })

  // update the task 
  const updateTaskQ = `UPDATE task SET name = $1, genre_id = (SELECT _id FROM genre WHERE genre = $2), status_id = (SELECT _id FROM status WHERE status = $3), start_date = $4, end_date = $5 WHERE _id=$6`
  
  const values = [name, genre, status, startDate, endDate, taskId];

  db.query(updateTaskQ, values, (err, res) => {
    if (err) {
      console.log('failed to update task')
    } else {
      console.log(`task updated!`)
    }
  })

  let taskCounter = 1
  let userCounter = 2
  let queryConcatStr = ''
  const toAddValues = []; //taskId, halia, taskId, kyle, taskid, rylie
  users.forEach(el => {
    queryConcatStr += `INSERT INTO task_user (task_id, user_id) VALUES (${taskCounter}, (SELECT _id FROM users WHERE username = ${userCounter}))`
    toAddValues.push(...[taskId, el])
    taskCounter+=2,
    userCounter+=2
  })

  db.query(queryConcatStr, toAddValues, (err, res) => {
    if (err) {
      console.log('failed to update tasks with new users')
    } else {
      console.log('task updated with new users!')
    }
  })
} catch (err) {
  return next({
    log: `taskController.updateTask ERROR: ` + err,
    message: {
      err: `trouble updating task`,
    },
  });
}
};


taskController.deleteTask = async function (req, res, next) {
  // retrieve task name and teamName
  const { name } = req.body;
  const teamName = req.query.teamName;
  // find taskId
  // delete from task_user where task_id = taskId


  // delete from task where id = task_id

  // delete from board where task_id = id

  
};

module.exports = taskController;
