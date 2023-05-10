import { useState } from "react";
import classes from "./AddTask.module.css";
import Date2 from "./Date";

const AddTask = (props) => {
  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredDescription, setEnteredDescription] = useState("");
  const [enteredDate, setEnteredDate] = useState("");
  //const [isPriority, setIsPriority] = useState(false);
  const isCompleted = 0;
  const [isLoading, setIsLoading] = useState(false);


    

  async function addTaskHandler(event) {
    event.preventDefault();
    setIsLoading(true);

    if (enteredTitle.trim().length === 0 || enteredDate.trim().length === 0 ) {
      alert("กรุณาใส่ชื่อ Title และเลือกวันที่ ");
      return;
    }
    let currentDate = new Date().toJSON().slice(0, 10);
    console.log(currentDate);

    let list = {
      ListName : enteredTitle,
      ListDetail :enteredDescription,
      ListCreateTime : currentDate,
      ListTimeOut : enteredDate,
      ListCheck : isCompleted,
      UserID: localStorage.getItem('user')
    };

    let response = await fetch(
      "https://cloudy-elk-gear.cyclic.app/addlist",
      {
        method: "POST",
        body: JSON.stringify(list),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === "error") {
      alert("Something went wrong!");
    }else{
      const data = await response.json();
      console.log(data);
      console.log("Add Success")
      setEnteredTitle("");
      setEnteredDescription("");
      setIsLoading(false);

      
      //refresh page
      window.location.reload();


    }
  }

  const titleChangeHandler = (event) => {
    setEnteredTitle(event.target.value);
  };

  const descriptionChangeHandler = (event) => {
    setEnteredDescription(event.target.value);
  };

  const dateChangeHandler = (enteredDate2) => {
    setEnteredDate(enteredDate2);
  };

  return (
    <div className={classes.card}>
      <h2>
        What do You Have <p className={classes.todo}>ToDo</p>?
      </h2>
      <form onSubmit={addTaskHandler}>
        <input
          type="text"
          className={classes.input}
          placeholder="Title"
          onChange={titleChangeHandler}
          value={enteredTitle}
        />
        <textarea
          rows="10"
          className={classes.inputDesc}
          placeholder="Description"
          onChange={descriptionChangeHandler}
          value={enteredDescription}
        />
        <div className={classes.connector}>
          <Date2 enteredDate2={dateChangeHandler} />
          {/* <Prioritize onClick={priorityHandler} /> */}
        </div>
        <button type="submit" className={classes.button}>
          {!isLoading ? "Add" : "Adding..."}
        </button>
      </form>
    </div>
  );
};

export default AddTask;
