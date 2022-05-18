import React from "react";
import ManageToDo from "./ManageToDo";

const ToDoModal = () => {
  return (
    <div>
      <input type="checkbox" id="todo-modal" className="modal-toggle" />
      <div className="modal  sm:modal-middle cursor-pointer">
        <div className="modal-box relative sm:w-6/12 max-w-3xl">
          <label
            for="todo-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <ManageToDo />
        </div>
      </div>
    </div>
  );
};

export default ToDoModal;
