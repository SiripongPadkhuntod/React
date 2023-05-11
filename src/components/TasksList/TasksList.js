import { useState, useEffect } from "react";
import classes from "./TasksList.module.css";

const TasksList = (props) => {
  const [isSortingUp, setIsSortingUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [tasksList, setTasksList] = useState([]);

  const sortingChangeHandler = () => {
    if (!isSortingUp) {
      setIsSortingUp(true);
      props.onSortingTasks(isSortingUp);
    } else if (isSortingUp) {
      setIsSortingUp(false);
      props.onSortingTasks(isSortingUp);
    }
  };

  async function fetchTasks() {
    setIsLoading(true);
    const Username = localStorage.getItem('user');
    let response = await fetch(
      "https://cloudy-elk-gear.cyclic.app/getlist",{
        method: "POST",
        body: JSON.stringify({UserID: Username}),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error("Something went wrong");
    }

    let jsondata = await response.json(); 
    console.log(jsondata);
    const loadedTasks = [];

    for (const key in jsondata.data) {
      loadedTasks.push({
        id: jsondata.data[key].ListID,
        enteredTitle: jsondata.data[key].ListName, 
        enteredDescription: jsondata.data[key].ListDetail,
        enteredDate: jsondata.data[key].ListTimeOut.slice(0, 10),
        isCompleted: jsondata.data[key].ListCheck,
      });
    }
    setTasksList(loadedTasks);
    setIsLoading(false);
  }

  async function checkList(id) {
    let response = await fetch(
      "https://cloudy-elk-gear.cyclic.app/updatelist",
      {
        method: "POST",
        body: JSON.stringify({ListID: id}),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      console.log("Something went wrong", response.status);
    }
    let jsondata = await response.json();
    console.log(jsondata);
    window.location.reload();
  }

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className={classes.block}>
      <h2>
        <p className={classes.todo}>ToDo </p>List
      </h2>
      <div className={classes.sortingDiv}>
        {/* <p>Sort by:</p>
        <button onClick={sortingChangeHandler}>
          Date{!isSortingUp ? <i className="fa-solid fa-arrow-up"></i> : ""}
          {isSortingUp ? <i className="fa-solid fa-arrow-down"></i> : ""}
        </button> */}
        {/* <button>
          Date<i class="fa-solid fa-arrow-down"></i>
        </button> */}
      </div>
      {isLoading && <p>Loading tasks...</p>}
      {tasksList.length === 0 && !isLoading && <p>Tasks not found!</p>}
      <ul>
        {tasksList.map((task) => (
          <div
            key={task.id}
            className={
              task.isPriority === 0
                ? classes.listItem
                : classes.listItemPriority
            }
          >
            <div
              className={classes.circle}
              onClick={() => {
                console.log(task.id);
                checkList(task.id);
              }}
            ></div>
            <div
              className={
                task.isCompleted
                  ? classes.completeStatus
                  : classes.unCompleteStatus
              }
              onClick={() => {
                props.onStatusTask(task.id);
              }}
            >
              <i className="fa-solid fa-check"></i>
            </div>
            <button
              className={classes.smallButton}
              onClick={() => {
                props.onDeleteTask(task.id);
              }}
            >
              X
            </button>
            <label
              className={
                task.isCompleted === 0
                  ? classes.title
                  : classes.titleCompleted
              }
            >
              {task.enteredTitle}
            </label>
            <label
              className={
                task.isCompleted === 0
                  ? classes.priorityStatus
                  : classes.priorityStatusCompleted
              }
            >
            </label>
            <br></br>
            <label
              className={
                task.isCompleted === 0
                  ? classes.description
                  : classes.descriptionCompleted
              }
            >
              {task.enteredDescription}
            </label>
            <br></br>
            <label
              className={
                task.isCompleted === 0
                  ? classes.date
                  : classes.dateCompleted
              }
            >
              {task.enteredDate}
            </label>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default TasksList;
