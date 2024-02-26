import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { addEmployee, getDepartments } from "../utils/ApiFunctions";
import toastr from "toastr";

const AddEmployee = () => {
  const [newEmployee, setNewEmployee] = useState({
    FirstName: "",
    LastName: "",
    Address: "",
    MobileNumber: "",
    Email: "",
    Birthday: "",
    DateOfJoining: "",
    Department: "",
  });
  const [successMessage, setsuccessMessage] = useState("");
  const [errorMessage, seterrorMessage] = useState("");
  const [departments, setDepartments] = useState([]);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setNewEmployee({ ...newEmployee, [name]: value });
  };

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const departmentsData = await getDepartments();
        setDepartments(departmentsData);
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };

    fetchDepartments();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const success = await addEmployee(
        newEmployee.FirstName,
        newEmployee.LastName,
        newEmployee.Address,
        newEmployee.MobileNumber,
        newEmployee.Email,
        newEmployee.Birthday,
        newEmployee.DateOfJoining,
        newEmployee.Department
      );

      if (success !== undefined) {
        setsuccessMessage("A new employee was added to the database");
        setNewEmployee({
          FirstName: "",
          LastName: "",
          Address: "",
          MobileNumber: "",
          Email: "",
          Birthday: "",
          DateOfJoining: "",
          Department: "",
        });
        setErrors({});
        seterrorMessage("");
        toastr.success("Employee added successfully!");
      } else {
        seterrorMessage("Error adding employee");
      }
    } catch (error) {
      seterrorMessage(error.message);
    }
    setTimeout(() => {
      setsuccessMessage("");
      seterrorMessage("");
    }, 3000);
  };

  return (
    <>
      <section className="container mt-5 mb-5">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <h2 className="mt-5 mb-2">Add a New Employee</h2>
            {successMessage && (
              <div className="alert alert-success fade show">
                {successMessage}
              </div>
            )}
            {errorMessage && (
              <div className="alert alert-danger fade show">{errorMessage}</div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="firstName" className="form-label">
                  First Name <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  name="FirstName"
                  value={newEmployee.FirstName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="lastName" className="form-label">
                  Last Name <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  name="LastName"
                  value={newEmployee.LastName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="address" className="form-label">
                  Address <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="address"
                  name="Address"
                  value={newEmployee.Address}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="mobileNumber" className="form-label">
                  Mobile Number <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="mobileNumber"
                  name="MobileNumber"
                  value={newEmployee.MobileNumber}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email <span className="text-danger">*</span>
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="Email"
                  value={newEmployee.Email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="birthday" className="form-label">
                  Birthday <span className="text-danger">*</span>
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="birthday"
                  name="Birthday"
                  value={newEmployee.Birthday}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="dateOfJoining" className="form-label">
                  Date of Joining <span className="text-danger">*</span>
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="dateOfJoining"
                  name="DateOfJoining"
                  value={newEmployee.DateOfJoining}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="department" className="form-label">
                  Department <span className="text-danger">*</span>
                </label>
                <select
                  className="form-select"
                  id="department"
                  name="Department"
                  value={newEmployee.Department}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Department</option>
                  {departments.map((department) => (
                    <option key={department.DeptId} value={department.DeptName}>
                      {department.DeptName}
                    </option>
                  ))}
                </select>
              </div>

              <button type="submit" className="btn btn-primary">
                Add Employee
              </button>
              <Link to={"/"} className="btn btn-outline-info">
                Back
              </Link>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default AddEmployee;
