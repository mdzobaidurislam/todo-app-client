import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import auth from "../Firebase/Firebase.init";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import SpinnerLoading from "../Share/SpinnerLoading";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  let navigate = useNavigate();

  // google
  const [signInWithGoogle, googleUser, googleLoading, googleError] =
    useSignInWithGoogle(auth);
  // use effect
  useEffect(() => {
    if (googleUser) {
      navigate("/todo");
    }
  }, [googleUser, navigate]);

  let errorElement;
  if (googleError) {
    errorElement = (
      <div className="alert alert-warning shadow-lg">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current flex-shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <span>Warning:{googleError?.message}!</span>
        </div>
      </div>
    );
  }
  if (googleLoading) {
    return <SpinnerLoading />;
  }
  if (googleUser) {
    navigate("/todo");
  }

  return (
    <div className="form_section py-20">
      <div className="flex justify-center">
        <div className="pt-10">
          <h2 className=" text-4xl text-center font-bold uppercase  my-4">
            Welcome to the ToDo App!
          </h2>
          <div className="card  bg-base-100 ">
            <div className="card-body">
              <h2 className=" text-center font-bold uppercase">
                Sign In &amp; Access Your Account
              </h2>
              {errorElement && errorElement}
              <div className="card-actions justify-end">
                <button
                  className="btn btn-outline w-full text-xl"
                  onClick={() => signInWithGoogle()}
                >
                  <span className="mr-3">
                    <FcGoogle />
                  </span>
                  Sign in with Google
                </button>
                <Link className="btn btn-outline w-full text-xl" to="/todo">
                  GO TO TODO
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
