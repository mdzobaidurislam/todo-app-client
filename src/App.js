import { Route, Routes } from "react-router-dom";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import Login from "./components/Login/Login";
import ToDo from "./components/ToDo/ToDo";
import { ToastContainer } from "react-toastify";
import RequireAuth from "./components/RequireAuth/RequireAuth";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/todo"
          element={
            <RequireAuth>
              <ToDo />
            </RequireAuth>
          }
        />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
