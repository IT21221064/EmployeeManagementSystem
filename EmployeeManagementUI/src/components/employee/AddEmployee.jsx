import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { addEmployee } from "../utils/ApiFunctions";

const AddEmployee = () => {
  const [newEmpolyee, setNewEmplooyee] = useState({
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
  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setNewEmplooyee({ ...newEmpolyee, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const success = await addEmployee(
        newEmpolyee.FirstName,
        newEmpolyee.LastName,
        newEmpolyee.Address,
        newEmpolyee.MobileNumber,
        newEmpolyee.Email,
        newEmpolyee.Birthday,
        newEmpolyee.DateOfJoining,
        newEmpolyee.Department
      );

      if (success !== undefined) {
        setsuccessMessage("A new employee was added to the database");
        setNewEmplooyee({
          FirstName: "",
          LastName: "",
          Address: "",
          MobileNumber: "",
          Email: "",
          Birthday: "",
          DateOfJoinning: "",
          Department: "",
        });
        seterrorMessage("");
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
      <section className="container,mt-5 mb-5">
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
                  First Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  name="FirstName"
                  value={newEmpolyee.FirstName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="lastName" className="form-label">
                  Last Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  name="LastName"
                  value={newEmpolyee.LastName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="address" className="form-label">
                  Address
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="address"
                  name="Address"
                  value={newEmpolyee.Address}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="mobileNumber" className="form-label">
                  Mobile Number
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="mobileNumber"
                  name="MobileNumber"
                  value={newEmpolyee.MobileNumber}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="Email"
                  value={newEmpolyee.Email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="birthday" className="form-label">
                  Birthday
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="birthday"
                  name="Birthday"
                  value={newEmpolyee.Birthday}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="dateOfJoining" className="form-label">
                  Date of Joining
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="dateOfJoining"
                  name="DateOfJoining"
                  value={newEmpolyee.DateOfJoining}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="department" className="form-label">
                  Department
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="department"
                  name="Department"
                  value={newEmpolyee.Department}
                  onChange={handleInputChange}
                  required
                />
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
