import React, { useContext, useState } from 'react';
import { UserContext } from '../contexts/Contexts';
import Select from 'react-select';

export function NewTask(props) {
  //   const tester = 'tester'
  // const { globalUsername } = useContext(UserContext);
  const { setAreTasksChanged, taskPopup, closeTaskPopup, setTaskData } = props;
  const emptyForm = { taskName: '', days: '' };
  const [formData, setFormData] = useState(emptyForm);
  const loggedUser = localStorage.getItem('username');
  const teamName = localStorage.getItem('teamName');
  const [genre, setGenre] = useState('');

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  }

  const genres = [
    { label: 'Work' },
    { label: 'Personal' },
    { label: 'Fitness' },
    { label: 'Hobbies' },
    { label: 'Spiritual' },
  ];

// useEffect( () => {
  function handleGenreSubmit(selectedOption) {
    setGenre(selectedOption);
    // console.log(genre);
  }
// }, [])

  function handleGenreSubmit(selectedOption) {
    setGenre(selectedOption);
    // console.log(genre);
  }

  // const handleGenreSubmit = async (options) => {
  //   try {
  //     let newGenre = options.label;
  //     const newState = await setGenre(newGenre);
  //     console.log('genre select:' + genre)
  //   }
  //   catch(err){
  //     console.log(err)
  //   }
  //   // let newGenre = options.label;
  //   // async function settingState(){
  //   //   const newState = await setGenre(newGenre);
  //   // }
  //   // settingState();

  // }

  //& Handle request on submit button
  function handleSubmit(event) {
    event.preventDefault();
    //~ Get form data and additional data to send to API
    console.log('clicked submit new task');
    // Get current date
    const currDate = new Date();
    // console.log('currDate: ', currDate);
    // Calculate end date
    const endDate = new Date(currDate); //initialize it to currDate 
    console.log('endDate: ', endDate);
    // console.log('Number(formData.days) ', Number(formData.days))
     //getDate retrieves the number of the month
     //setDate sets the date of the month
    endDate.setDate(currDate.getDate() + Number(formData.days));

    console.log('endDate modified: ', endDate);
    // console.log('data to send: ', formData.taskName, currDate, endDate)

    //~ Create new task by sending POST req with data
    async function createNewTask() {
      try {
        //TODO: check if fields are empty and return error
        console.log('entered createnewtask');
        const response = await fetch(`/api/task/?teamName=${teamName}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: formData.taskName,
            status: 'to do',
            genre: 'Hobbies',
            startDate: currDate,
            endDate: endDate,
            users: [loggedUser],
          }),
        });
        // console.log('response', response);
        // expect status 200 as a response
        const data = await response;
        // console.log('data from task posting: ', data);

        // { name, genre, status, startDate, endDate, users }
        //~ Set the areTasksChanged boolean to true to notify the TaskBoard to refresh
        setAreTasksChanged(true);

        //~ Reset Form
        setFormData(emptyForm);

        //~ Close Popout
        closeTaskPopup();

        // re render page after posting task
        location.reload();
      } catch (err) {
        console.log('createNewTask:', err);
      }
    }

    createNewTask();
  }

  const users = [];

  /*
  // fetch the users from the current team
  fetch('/api/teamname')
    .then((res) => res.json())
    .then(data => {
      data.forEach(user => users.push(user))
    })
  */

  return (
    <div>
      {taskPopup ? ( // if taskPopup is true, will render the NewTask obj. Otherwise nothing will be shown
        <div className="new-task-popup">
          <div className="new-task-popup-inner">
            <h2>Create a New Task</h2>
            <hr />

            <div>
              <label htmlFor="genreSelector">
                <h3>Select a Genre</h3>
              </label>
              <Select
                id="genreSelector"
                options={genres}
                value={genre}
                onChange={handleGenreSubmit}
              />
            </div>
            <form onSubmit={handleSubmit} className="form">
              <div>
                <label htmlFor="taskName">
                  <h3>Task Name</h3>
                </label>
                <input
                  type="text"
                  id="taskName"
                  name="taskName"
                  value={formData.taskName}
                  onChange={handleChange}
                  placeholder="New Task"
                ></input>
              </div>
              <div>
                <label htmlFor="days">
                  <h3>Days to Complete Task</h3>
                </label>
                <input
                  type="number"
                  id="days"
                  name="days"
                  value={formData.days}
                  onChange={handleChange}
                  placeholder="Days to Complete"
                ></input>
              </div>

              <button className="new-task-submit-button">Submit</button>
            </form>
            <button className="new-task-close-button" onClick={closeTaskPopup}>
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
