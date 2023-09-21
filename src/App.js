import React, { useState } from "react";
import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import Task from "./Components/TaskContainer/Task";

const App = () => {
  const [display, setDisplay] = useState("none");

  return (
    <div className="App">
      <Navbar display={display} setDisplay={setDisplay} />
      <Task display={display} setDisplay={setDisplay} />
    </div>
  );
};

export default App;
