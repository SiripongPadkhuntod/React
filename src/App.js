import { useState,React,useEffect } from "react";
import Button from '@mui/material/Button';
import AddTask from "./components/AddTask/AddTask";
import TasksList from "./components/TasksList/TasksList";



export default function MyApp() {
  useEffect(() => { 
      const token = localStorage.getItem('token');
      const Username = localStorage.getItem('user');
      fetch("https://cloudy-elk-gear.cyclic.app/authen", {
          method: "POST", // or 'PUT'
          headers: {
              "Content-Type": "application/json",
              "Authorization": 'Bearer ' + token 
          }
      })
      .then((response) => response.json())
      .then((data) => {
          if (data.status === "ok") {
       
              console.log("Authen Success User: " + Username);
          }
          else {
              console.log("Authen failed");
              localStorage.removeItem('token');
              localStorage.removeItem('user');
              window.location = '/login';
          }
      }
      );
  }, []);

  const [tasksList, setTasksList] = useState([]); 
 // const [restart, setRestart] = useState(false); //คือการเปลี่ยนค่าให้เป็นตรงกับตัวเอง โดยการกดปุ่มเพื่อเปลี่ยนค่าให้เป็นตรงกับตัวเอง

  const changeTaskStatusHandler = (key) => {
    const updatedTasksList = tasksList.map((current) => {
      if (current.id === key) {
        if (current.isCompleted === false) {
          current.isCompleted = true;
        } else if (current.isCompleted === true) {
          current.isCompleted = false;
        }
        return current;
      }
      return current;
    });
    setTasksList(updatedTasksList);
  };

  async function deleteTaskHandler(key) {
    console.log(key);
     const updatedTasksList = tasksList.filter((current) => current.id !== key);
    setTasksList(updatedTasksList);

    let response = await fetch(
      "https://cloudy-elk-gear.cyclic.app/deletelist",
      {
        method: "POST",
        body: JSON.stringify({ ListID: key }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    await response.json();
    console.log(response);
    window.location.reload();
  }

  const sortingTasksHandler = (isSortingUp) => {
    console.log(isSortingUp);
    if (isSortingUp) {
      tasksList.sort(function (a, b) {
        return new Date(b.date) - new Date(a.date);
      });
    } else {
      tasksList.sort(function (a, b) {
        return new Date(a.date) - new Date(b.date);
      });
    }
  };
   
  return (
    <div>
      <AddTask />
      <TasksList
         tasks={tasksList}
         onDeleteTask={deleteTaskHandler}
         onStatusTask={changeTaskStatusHandler}
         onSortingTasks={sortingTasksHandler}
      />
  
     
    </div>
  );
}