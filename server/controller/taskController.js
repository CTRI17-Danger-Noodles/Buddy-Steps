const path = require('path');
const db = require('../models/buddyModel');

// Modular error creator:
const createErr = (errInfo) => {
  return {
    log: errInfo,
    message: {
      err: `taskController error: Incorrect data received.`,
    },
  };
};

// controller object holding all methods.
const taskController = {};

// // method to get all the user data.
// taskController.getTaskData = async function (req, res, next) {
//   try {
//     // joining our user's task table id to match the foreign keys with the task table to get that user's specific tasks. Searching for a dynamic value based off the username.
//     const queryString = {
//       text: `SELECT tasks.id AS "taskID", tasks.task, tasks.startDate, tasks.endDate 
//       FROM UsersTasksJoinTable
//       RIGHT JOIN Users
//       ON UsersTasksJoinTable.userId = Users.id
//       RIGHT JOIN Tasks
//       ON UsersTasksJoinTable.taskId = Tasks.id
//       WHERE users.username = $1;`,
//       values: [req.query.username],
//     };
//     const result = await db.query(queryString);
//     res.locals.taskData = result.rows;
//     return next();
//   } catch (error) {
//     const newErr = createErr(error);
//     return next(newErr);
//   }
// };

//add the task to the task to table
//link the userid and the task in the task in the table.
taskController.createTask = async function (req, res, next) {
  // destructuring all info about new task 
  // *Note: users will be an array of usernames
  const { name, genre, status, startDate, endDate, users } = req.body;
  // teamName provided throough req.query
  const teamName = req.query.teamName;
  
  /*
    no response needed for succesful creation
  */
}; 



taskController.updateTask = async function (req, res, next) {
  // destructuring all info about new task 
  // *Note: users will be an array of usernames
  const { name, genre, status, startDate, endDate, users } = req.body;
  // teamName provided throough req.query
  const teamName = req.query.teamName;
  
  // try {
  //   // pulling username from the query parameter in the url.
  //   const taskIdToBeUpdated = req.query.taskId;

  //   // pulling task from
  //   const updatedTask = req.body.updatedTask;
  //   const updatedEndTime = req.body.updatedEndTime;
  //   let updatedId;

  //   // query to update the task specific to that user.
  //   if (!updatedEndTime) {
  //     const updateTaskQuery = `
  //       UPDATE tasks
  //       SET task = $1
  //       WHERE id = $2
  //       RETURNING id;
  //     `;

  //     // assigning the updated task id to variable updated once done.
  //     updatedId = await db.query(updateTaskQuery, [
  //       updatedTask,
  //       taskIdToBeUpdated,
  //     ]);

  //     // query to update the end time specific to that user.
  //   } else if (!updatedTask) {
  //     const updateTimeQuery = `
  //       UPDATE tasks
  //       SET enddate = $1
  //       WHERE id = $2
  //       RETURNING id;
  //     `;

  //     // assigning the updated task id to variable updated once done.
  //     updatedId = await db.query(updateTimeQuery, [
  //       updatedEndTime,
  //       taskIdToBeUpdated,
  //     ]);

  //     // query to update both task name and end time specific to that user.
  //   } else if (updatedTask && updatedEndTime) {
  //     const updateTaskAndTimeQuery = `
  //       UPDATE tasks
  //       SET task = $1, enddate = $2 
  //       WHERE id = $3
  //       RETURNING id;
  //     `;

  //     // assigning the updated task id to variable updated once done.
  //     updatedId = await db.query(updateTaskAndTimeQuery, [
  //       updatedTask,
  //       updatedEndTime,
  //       taskIdToBeUpdated,
  //     ]);
  //   }

  //   // sending back updated task id to confirm it was updated.
  //   res.locals.updatedTaskId = updatedId.rows[0].id;
  //   return next();
  // } catch (error) {
  //   const newErr = createErr(error);
  //   return next(newErr);
  // }
};

taskController.deleteTask = async function (req, res, next) {
  // retrieve task name and teamName
  const { name } = req.body;
  const teamName = req.query.teamName;
};

module.exports = taskController;
