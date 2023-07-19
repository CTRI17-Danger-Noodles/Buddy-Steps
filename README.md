# Buddy-Steps
Take the buddy steps

# React Front End Organization
# READ ON VSCODE FOR BETTER READABILITY
REACT Front End
App.jsx
globalUsername: context variable, passes username to all parts of the web app
    Home
        taskData: contains data for all tasks. Although taskData is shown only in the taskboard object, it is initialized here because we need to pass ‘setTaskData’ to the header because the new task object is located in header
        areTasksChanged: boolean that indicates if task data is changed. Will cause the the taskBoard to re-render. It is also used in header ->newTask hence why it is here (making the useEffect change on taskData caused an infinite render loop)
        isSideBarShowing: similar to above
        HeaderContainer
            taskPopup: boolean that indicates if newTask action has occurred. Then causes pop up to appear
            profile/name: assigned based on global username
            NewTask
                formData: handles formData
        TaskBoardContainer
            editPopup: boolean that controls popup for editing task (similar to taskPopup)
            taskIndex: task number that is being edited. Need this because the edit button is in a different component then editTask (editTask is adjacent to this so not in same ancestor line) (also need this for delete)
            EditTask
                formData: handles form data
            Task
                editButton(): opens pop up, passes respective index to taskBoard
                deleteButton(): delete task, passes respective index to taskBoard to delete

Future Features
Progress Bar
Currently is just updating and state is NOT saved
Tried implementing feature but doesn't work

Why it is broken
POST req to get the progress info for each bar
PATCH req to update the progress info for each bar
Problem is we are making individual GET requests for each task bar. Not exactly sure what the issue is. I am pretty confident the issue is our DB has a limited number of query requests it can handle at once. This causes some of the information to come back as NULL. Sometimes when you refresh it will go from NULL back to the normal value. 

Potential Solution: 
a potential solution is you implement a method to pull all the information at once rather than in each individual task object. This will result in a lot more work however
With the previous method, the add/delete tasks were auto implemented into the task object so you do not need to implement it into progress bar data
However with this new solution you WILL need to. And the since add/delete task buttons are located in different areas, you will need to create this state at their intersections which is Home…gg no re

Side Bar
Has a bunch of random stuff you can implement

# og SQL data model
    - all tables:
                            List of relations
    Schema |            Name            |   Type   |  Owner   
    --------+----------------------------+----------+----------
    public | homies                     | table    | kvumtzjm
    public | tasks                      | table    | kvumtzjm
    public | users                      | table    | kvumtzjm
    public | userstasksjointable        | table    | kvumtzjm

    - homies
                            Table "public.homies"
    Column   |         Type          | Collation | Nullable | Default 
    -----------+-----------------------+-----------+----------+---------
    id        | integer               |           | not null | 
    firstname | character varying(20) |           |          | 
    lastname  | character varying(20) |           |          | 
    Indexes:
        "t_pkey" PRIMARY KEY, btree (id)

    - tasks
                                Table "public.tasks"
    Column   |            Type             | Collation | Nullable |              Default              
    -----------+-----------------------------+-----------+----------+-----------------------------------
    id        | integer                     |           | not null | nextval('tasks_id_seq'::regclass)
    task      | character varying           |           | not null | 
    startdate | timestamp without time zone |           | not null | 
    enddate   | timestamp without time zone |           | not null | 
    Indexes:
        "tasks_pkey" PRIMARY KEY, btree (id)
    Referenced by:
        TABLE "userstasksjointable" CONSTRAINT "userstasksjointable_taskid_fkey" FOREIGN KEY (taskid) REFERENCES tasks(id) ON DELETE CASCADE

    - table users
                                      Table "public.users"
    Column   |       Type        | Collation | Nullable |              Default              
    ------------+-------------------+-----------+----------+-----------------------------------
    id         | integer           |           | not null | nextval('users_id_seq'::regclass)
    username   | character varying |           | not null | 
    password   | character varying |           | not null | 
    name       | character varying |           | not null | 
    profilepic | character varying |           |          | 
    Indexes:
        "users_pkey" PRIMARY KEY, btree (id)
        "uq_username" UNIQUE CONSTRAINT, btree (username)
    Referenced by:
        TABLE "userstasksjointable" CONSTRAINT "userstasksjointable_userid_fkey" FOREIGN KEY (userid) REFERENCES users(id) ON DELETE CASCADE

    - userstasksjointable
                        Table "public.userstasksjointable"
        Column    |            Type             | Collation | Nullable |                     Default                     
    --------------+-----------------------------+-----------+----------+-------------------------------------------------
    id           | integer                     |           | not null | nextval('userstasksjointable_id_seq'::regclass)
    userid       | integer                     |           |          | 
    taskid       | integer                     |           |          | 
    taskcurrdate | timestamp without time zone |           |          | 
    currprogress | integer                     |           |          | 
    Indexes:
        "userstasksjointable_pkey" PRIMARY KEY, btree (id)
    Foreign-key constraints:
        "userstasksjointable_taskid_fkey" FOREIGN KEY (taskid) REFERENCES tasks(id) ON DELETE CASCADE
        "userstasksjointable_userid_fkey" FOREIGN KEY (userid) REFERENCES users(id) ON DELETE CASCADE

DRAGON NOODLE
SQL RECREATION:

CREATE TABLE users (
_id SERIAL PRIMARY KEY,
username VARCHAR(25) NOT NULL,
password VARCHAR(50) NOT NULL,
profilePic BYTEA
)

CREATE TABLE teams (
_id SERIAL PRIMARY KEY,
name VARCHAR(50),
user_id INT
);
ALTER TABLE teams
add constraint fk_teams_users //constraining the tables to each other (team is dependent on users)
foreign key (user_id)
REFERENCES users (_id); // user_id is a reference to id in users table

CREATE TABLE genres (
_id SERIAL PRIMARY KEY,
genre VARCHAR(50) not null
);
INSERT INTO genres(genre) 
VALUES ('work'), ('personal'), ('fitness'), ('hobby'), ('spiritual');

CREATE TABLE status (
_id SERIAL PRIMARY KEY,
type VARCHAR(50) not null
);
INSERT INTO status(type) 
VALUES ('to do'), ('in progress'), ('complete');

ALTER TABLE task
add constraint fk_task_genre
foreign key (genre_id)
REFERENCES genres (_id);

ALTER TABLE task
add constraint status
foreign key (status_id)
REFERENCES status (_id);

CREATE TABLE board (
team_id INT,
task_id INT
);

ALTER TABLE board
add constraint fk_board_teams
foreign key (team_name)
REFERENCES teams (name)

ALTER TABLE board
add constraint fk_board_task
foreign key (task_id)
REFERENCES task (_id)

CREATE TABLE task_user (
task_id INT,
user_id INT
);

