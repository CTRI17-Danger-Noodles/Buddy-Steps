import React, { useState, useEffect, useRef} from 'react';
import DatePicker from 'react-datepicker';

export function EditTask(props) {
  const {
    editPopup,
    closeEditPopup,
    taskIndex,
    setTaskIndex,
    taskData,
    setAreTasksChanged,
  } = props;
  // const { username } = useContext(UserContext)
  const emptyForm = {
    updatedTask: '',
    updatedEndTime: new Date(),
    taskID: null,
  };
  const [bodyObj, setBodyObj] = useState({
    oldname: null,
    name: null,
    status: null,
    endDate: null,
  });

  const [formData, setFormData] = useState(emptyForm);
  const teamName = localStorage.getItem('teamName');
  
  const reference = useRef();

  //& On rendering the Edit task, need to display current task data
  // useEffect(() => {
  //   if (taskIndex != -1) {
  //     //on the very first render before user even gets a chance to press the edit button. we dont want to run the code below. test task index to a default value of -1 in taskboard.jsx
  //     // console.log(taskData[taskIndex])
  //     // console.log(typeof taskData[taskIndex].enddate)
  //     setFormData({
  //       updatedTask: taskData[taskIndex].name,
  //       updatedEndTime: taskData[taskIndex].enddate,
  //       taskID: taskData[taskIndex].taskID,
  //     });
  //   }
  // }, [taskIndex]);

  //& Auto updates form data when input box of form is filled in
  let str = '';
  function handleChange(event) {
    console.log('taskData[taskIndex].name: ', taskData[taskIndex].name);
    console.log('event', event.target.value);
    // const { name, value } = event.target;
    str += event.target.value;
    
  }

  function handleSubmit(event) {
    setBodyObj({
      ...bodyObj,
      oldname: taskData[taskIndex].name,
      name: str,
    });
  }


  //useEffect( () => {

//}, [])

useEffect(() => {
  async function updateTheTask() {
    // event.preventDefault();

    //~ Get form data to send to API
    const { taskID, updatedTask, updatedEndTime } = formData;
    const data = { updatedTask: updatedTask, updatedEndTime: updatedEndTime };
    console.log(data);
    console.log(taskID);
    // setBodyObj({
    //   ...bodyObj,
    //   oldname: taskData[taskIndex].name
    // })
    try {
      //~ Update task by sending patch request to api
      //TODO: check if fields are empty and return error
      console.log('bodyObj line 76: ', bodyObj);
      const response = await fetch(`/api/task/?teamName=${teamName}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bodyObj),
      });

      //~ Set the areTasksChanged boolean to true to notify the TaskBoard to refresh
      setAreTasksChanged(true);

      //~ Reset form
      setFormData(emptyForm);

      //~ Reset task index
      setTaskIndex(-1);

      //~ close popout
      closeEditPopup();
    } catch (err) {
      console.log('error occured in Edit Task, ', err);
    }
  }
  updateTheTask();
  }, [bodyObj])
  //& Handle request on submit button
  

  // setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));

  const statusClickHandler = async (e) => {
    // e.preventDefault();
    console.log('working');
    if (e.target.value === 'todo') {
      e.target.value = 'to do';
    }
    else if (e.target.value === 'inprogress') {
      e.target.value = 'in progress';
    }
    else if(e.target.value === 'complete') {
      e.target.value = 'complete';
    }
    console.log('e.target.value', e.target.value)

    setBodyObj({
      ...bodyObj,
      oldname: taskData[taskIndex].name,
      status: e.target.value,
    });
    // reference.current = bodyObj;
    // await promisedSetState({
    //   ...bodyObj,
    //   oldname: taskData[taskIndex].name,
    //   status: e.target.value,
    // });
  };
  
  
  


  // const promisedSetState = (newState) => new Promise(resolve => setBodyObj(newState, resolve));

  // await promisedSetState({ someState: true });

  //   function beforeSubmit() {
  //   setBodyObj({
  //     ...bodyObj,
  //     oldname: taskData[taskIndex].name
  //   });
  //   // handleSubmit();
  // }
  // beforeSubmit();

  return (
    <div>
      {editPopup ? (
        <div className="new-task-popup">
          <div className="new-task-popup-inner">
            <h2>Update Your Task</h2>
            <hr />
            {/* <form onSubmit={handleSubmit} className="form"> */}
              <div className="form">
                <label htmlFor="updatedTask">
                  <h3>Task Name</h3>
                </label>
                <input
                  type="text"
                  id="text"
                  name="updatedTask"
                  // value={formData.updatedTask}
                  onChange={handleChange}
                ></input>
              </div>
              <div>
                {/* <label htmlFor="updatedEndTime">
                  <h3>End Date</h3>
                </label> */}
                {/* <input type='text' id='text' name='updatedEndTime' value={formData.updatedEndTime} onChange={handleChange}></input> */}
                {/* <div>
                  <DatePicker
                    selected={new Date(formData.updatedEndTime)}
                    onChange={(date) => {
                      setFormData((prevForm) => {
                        return { ...prevForm, updatedEndTime: date };
                      });
                    }}
                  />
                </div> */}
              </div>

              <button className="new-task-submit-button" onClick={handleSubmit}>Submit</button>
            {/* {/* </form> */}
            <label htmlFor="statusButtons">
              <h3>Move Status</h3>
            </label>
            <div className="statusButtons">
              <button
                className="statusButton"
                id="todoButton"
                value="todo"
                onClick={statusClickHandler}
              >
                {' '}
                To Do
              </button>
              <button
                className="statusButton"
                id="progressButton"
                value="inprogress"
                onClick={statusClickHandler}
              >
                {' '}
                In Progress
              </button>
              <button
                className="statusButton"
                id="completeButton"
                value="complete"
                onClick={statusClickHandler}
              >
                {' '}
                Complete
              </button>
            </div>
            <button className="new-task-close-button" onClick={closeEditPopup}>
              x
            </button>
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
}
