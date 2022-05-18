import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import Navbar from "../Share/Navbar/Navbar";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../Firebase/Firebase.init";
import ToDoModal from "./ToDoModal";
const ToDo = () => {
  const [user] = useAuthState(auth);
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  // add todo task
  const handleAddToDo = async (inputdata) => {
    const AddData = {
      email: user?.email,
      name: inputdata.name,
      description: inputdata.description,
    };
    const { data } = await axios.post(
      `https://todo-apps-servers.herokuapp.com/api/todo`,
      AddData
    );
    if (data.success) {
      toast.success(data.msg);
    }
    reset();
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4">
        <div className="flex justify-center pt-10">
          <h2 className=" text-4xl text-center font-bold uppercase  my-4">
            Add a new To do
          </h2>
        </div>

        <div className="flex justify-center">
          <form
            action=""
            className="w-96"
            onSubmit={handleSubmit(handleAddToDo)}
          >
            <div className="form-control">
              <div className="input-group w-full ">
                <input
                  {...register("name", { required: true })}
                  type="text"
                  placeholder="Enter Name"
                  className="input input-bordered w-full"
                />
              </div>
              <p className="text-red-800 fw-bold mb-3 font-bold">
                {errors.name?.type === "required" && "Name is required"}
              </p>
              <div className="mb-3">
                <textarea
                  {...register("description", { required: true })}
                  className="textarea w-full textarea-ghost input-bordered mr-2"
                  placeholder="Description"
                ></textarea>
                <p className="text-red-800 font-bold">
                  {errors.description?.type === "required" &&
                    "Description is required"}
                </p>
              </div>

              <div>
                <button className="btn btn-square  w-full text-white">
                  Add ToDo task{" "}
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="flex justify-center">
          <div className="w-96">
            <label
              htmlFor="todo-modal"
              className="mt-4 w-full  text-black modal-button btn btn-outline btn-secondary"
            >
              Complete
            </label>{" "}
          </div>
        </div>
        <div className="flex justify-center">
          <ToDoModal />
        </div>
      </div>
    </>
  );
};

export default ToDo;
