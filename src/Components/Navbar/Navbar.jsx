import React from "react";
import "./Nav.css";

const Navbar = ({ display, setDisplay }) => {
  return (
    <div className="Navbar">
      <div className="addTaskButtonContainer">
        <button
          onClick={() => {
            setDisplay("flex");
          }}
        >
          <i class="fa-sharp fa-light fa-plus"></i> Create Task
        </button>
      </div>
      <div className="profileContainer">
        <h3>hello developer</h3>
        <img
          src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000"
          alt=""
        />
      </div>
    </div>
  );
};

export default Navbar;
