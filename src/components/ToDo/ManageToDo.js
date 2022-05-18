import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../Firebase/Firebase.init";
const ManageToDo = () => {
  const [todos, setTodos] = useState([]);
  const [user] = useAuthState(auth);
  const email = user?.email;
  useEffect(() => {
    const getAllServices = async () => {
      const { data } = await axios.get(
        `https://todo-apps-servers.herokuapp.com/api/todo/${email}`
      );
      if (data) {
        setTodos(data);
      }
    };
    getAllServices();
  }, [todos, email]);

  //   handleToDoDelete
  const handleToDoDelete = async (id) => {
    try {
      const { data } = await axios.delete(
        `https://todo-apps-servers.herokuapp.com/api/todo/${id}`
      );
      if (data.success) {
        toast.success(data.msg);
      } else {
        toast.success(data.msg);
      }
    } catch (error) {
      if (error.response.status === 401 || error.response.status === 403) {
        toast(error.response.data.msg);
      }
    }
  };
  return (
    <div className=" mt-4 pb-20">
      <div className="overflow-x-auto">
        {todos.length > 0 ? (
          <table className="table w-full">
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Description</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {todos &&
                todos.map((item, i) => (
                  <tr key={item._id}>
                    <th>{i + 1}</th>
                    <td>{item.name}</td>
                    <td>{item.description}</td>
                    <td>
                      <button
                        onClick={() => handleToDoDelete(item._id)}
                        className=" btn-warning btn btn-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        ) : (
          <h2 className=" text-center font-bold uppercase text-2xl">
            No Task Available!
          </h2>
        )}
      </div>
    </div>
  );
};

export default ManageToDo;
