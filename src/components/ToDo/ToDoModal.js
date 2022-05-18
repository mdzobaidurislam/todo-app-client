import React from "react";

const ToDoModal = ({ todoInfo }) => {
  const { name, description } = todoInfo;
  return (
    <div>
      <input type="checkbox" id="todo-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            for="todo-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className=" font-bold text-2xl">{name}</h3>
          <p className="py-4">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default ToDoModal;
