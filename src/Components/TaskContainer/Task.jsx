import React, { useEffect, useState } from "react";
import "./task.css";

const Task = ({ display, setDisplay }) => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [taskState, setTaskState] = useState("Todo");
  const [taskDate, setTaskDate] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (task) {
      if (isEditMode) {
        const updatedTasks = [...tasks];
        updatedTasks[editIndex] = {
          task,
          taskState,
          taskDate,
        };
        setTasks(updatedTasks);
        setIsEditMode(false);
        setEditIndex(null);
      } else {
        setTasks([...tasks, { task, taskState, taskDate }]);
      }
      setTask("");
      setTaskState("Todo");
      setTaskDate("");
    }
  };

  const editTask = (index) => {
    const taskToEdit = tasks[index];
    setTask(taskToEdit.task);
    setTaskState(taskToEdit.taskState);
    setTaskDate(taskToEdit.taskDate);
    setIsEditMode(true);
    setEditIndex(index);
  };

  const deleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  const handleTaskStateChange = (index, newState) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].taskState = newState;
    setTasks(updatedTasks);
  };

  const onDragStart = (e, index) => {
    e.dataTransfer.setData("index", index);
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };

  const onDrop = (e, newState) => {
    const index = e.dataTransfer.getData("index");
    handleTaskStateChange(index, newState);
  };

  return (
    <div className="taskContainer">
      <div className="popupOuterContainer" style={{ display: display }}>
        <div className="popup">
          <h3>Create a Task For a Team</h3>
          <hr />
          <label>Add task Description:</label>

          <input
            type="text"
            className="descriptionInput"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <div>
            <label>Select task Status: </label>
            <select
              value={taskState}
              onChange={(e) => setTaskState(e.target.value)}
            >
              <option value="Todo">Todo</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>
          </div>
          <div>
            <label>Select Date: </label>
            <input
              type="date"
              value={taskDate}
              onChange={(e) => setTaskDate(e.target.value)}
            />
          </div>
          <button
            className="popupBtn"
            onClick={() => {
              //   addTask(tasks,setTasks,task,setTask,taskState,setTaskState,taskDate,setTaskDate,isEditMode,setIsEditMode,editIndex,setEditIndex,display,setDisplay)
              addTask();
              setDisplay("none");
            }}
          >
            {isEditMode ? "Update" : "Create Task"}
          </button>
        </div>
      </div>

      <div className="task-list">
        <div
          className="task-column"
          onDragOver={(e) => onDragOver(e)}
          onDrop={(e) => onDrop(e, "Todo")}
        >
          <h2>Tasks To do</h2>
          <hr />
          {tasks.map((task, index) =>
            task.taskState === "Todo" ? (
              <div
                key={index}
                className="task-card"
                draggable
                onDragStart={(e) => onDragStart(e, index)}
              >
                <p>{task.task}</p>
                <p>Date: {task.taskDate}</p>
                <div className="btnIcon">
                  <button
                    onClick={() => {
                      editTask(index);
                      setDisplay("flex");
                    }}
                  >
                    {" "}
                    <i class="fa-solid fa-pen-to-square"></i>{" "}
                  </button>
                  <button onClick={() => deleteTask(index)}>
                    <i class="fa-solid fa-trash-can"></i>
                  </button>
                </div>
              </div>
            ) : null
          )}
        </div>
        <div
          className="task-column"
          onDragOver={(e) => onDragOver(e)}
          onDrop={(e) => onDrop(e, "In Progress")}
        >
          <h2>In Progress</h2>
          <hr />
          {tasks.map((task, index) =>
            task.taskState === "In Progress" ? (
              <div
                key={index}
                className="task-card"
                draggable
                onDragStart={(e) => onDragStart(e, index)}
              >
                <p>{task.task}</p>
                <p>Date:{task.taskDate}</p>
                <div btnIcon>
                  <button
                    onClick={() => {
                      editTask(index);
                      setDisplay("flex");
                    }}
                  >
                    {" "}
                    <i class="fa-solid fa-pen-to-square"></i>{" "}
                  </button>
                  <button onClick={() => deleteTask(index)}>
                    <i class="fa-solid fa-trash-can"></i>
                  </button>
                </div>
              </div>
            ) : null
          )}
        </div>
        <div
          className="task-column"
          onDragOver={(e) => onDragOver(e)}
          onDrop={(e) => onDrop(e, "Done")}
        >
          <h2>Tasks Done</h2>
          <hr />
          {tasks.map((task, index) =>
            task.taskState === "Done" ? (
              <div
                key={index}
                className="task-card"
                draggable
                onDragStart={(e) => onDragStart(e, index)}
              >
                <p>{task.task}</p>
                <p>Date:{task.taskDate}</p>
                <div className="btnIcon">
                  <button
                    onClick={() => {
                      editTask(index);
                      setDisplay("flex");
                    }}
                  >
                    {" "}
                    <i class="fa-solid fa-pen-to-square"></i>{" "}
                  </button>
                  <button onClick={() => deleteTask(index)}>
                    <i class="fa-solid fa-trash-can"></i>
                  </button>
                </div>
              </div>
            ) : null
          )}
        </div>
      </div>
    </div>
  );
};

export default Task;
