import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddEmployee from "./components/employee/AddEmployee";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "/node_modules/bootstrap/dist/js/bootstrap.min.js";
import EmployeeList from "./components/employee/EmployeeList";
import EditEmployee from "./components/employee/EditEmployee";
import NavBar from "./components/layout/NavBar";
function App() {
  return (
    <>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<EmployeeList />} />
          <Route path="/add-emp" element={<AddEmployee />} />
          <Route path="/edit-emp/:id" element={<EditEmployee />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
