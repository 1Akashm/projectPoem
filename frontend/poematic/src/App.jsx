import React from "react";
import FormContainer from "./components/rootPath/FormContainer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./components/signup/Signup";
import Login from "./components/login/Login";
import Layout from "./components/Layout";
import { ToastContainer } from "react-toastify";
import Home from "./components/rootPath/Home";
import Navbar from "./components/navbar/Navbar";

const App = () => {
  return (
    <Router>
      <Navbar/>
      <ToastContainer
        position="bottom-right"
        draggable
        autoClose={3000}
        hideProgressBar
        icon={false}
        toastClassName={(context) =>
          `w-[300px] bg-transparent text-black 
          ${
            context.type === "error"
              ? "text-red-400"
              : context.type === "success"
              ? "text-green-400"
              : ""
          }`
        }
        style={{ bottom: "10%" }}
      />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/home" element={<Home/>}/>
          <Route index element={<FormContainer />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
