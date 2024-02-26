import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  getEmployee,
  updateEmployee,
  getDepartments,
} from "../utils/ApiFunctions";
import toastr from "toastr";

const EditEmployee = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState({
    EmployeeId: "",
    FirstName: "",
    LastName: "",
    Address: "",
    MobileNumber: "",
    Email: "",
    Birthday: "",
    DateOfJoining: "",
    Department: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [departments, setDepartments] = useState([]);

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

  // Fetch employee data when component mounts
  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        // Fetch employee data
        const response = await getEmployee(id);
        const empData = response.data[0]; // Access the first employee object in the array
        // Log the fetched data
        console.log(empData);
        // Update employee state with fetched data
        setEmployee({
          EmployeeId: empData.EmployeeId,
          FirstName: empData.FirstName,
          LastName: empData.LastName,
          Address: empData.Address,
          MobileNumber: empData.MobileNumber,
          Email: empData.Email,
          Birthday: empData.Birthday,
          DateOfJoining: empData.DateOfJoining, // Corrected key name
          Department: empData.Department,
        });
      } catch (error) {
        console.error(error);
      }
    };

    // Call fetchEmployee function
    fetchEmployee();
  }, [id]);

  // Handle input change for form fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Call updateEmployee function with the entire employee object
      const success = await updateEmployee(employee);
      if (success) {
        setSuccessMessage("Employee updated successfully");
        toastr.success("Employee updated successfully!");
      } else {
        setErrorMessage("Failed to update employee");
      }
    } catch (error) {
      console.error("Error updating employee:", error);
      setErrorMessage("Error updating employee");
    }
  };

  return (
    <>
      <section className="container mt-5 mb-5">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <h2 className="mt-5 mb-2">Edit Employee</h2>
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
                <label htmlFor="EmployeeId" className="form-label">
                  Emp ID
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="EmployeeId"
                  name="EmployeeId"
                  value={employee.EmployeeId || ""}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="firstName" className="form-label">
                  First Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="FirstName"
                  name="FirstName"
                  value={employee.FirstName || ""}
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
                  id="LastName"
                  name="LastName"
                  value={employee.LastName || ""}
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
                  id="Address"
                  name="Address"
                  value={employee.Address || ""}
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
                  id="MobileNumber"
                  name="MobileNumber"
                  value={employee.MobileNumber || ""}
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
                  id="Email"
                  name="Email"
                  value={employee.Email || ""}
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
                  id="Birthday"
                  name="Birthday"
                  value={employee.Birthday || ""}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="dateOfJoining" className="form-label">
                  Date Of Joining
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="DateOfJoining"
                  name="DateOfJoining"
                  value={employee.DateOfJoining || ""}
                  onChange={handleInputChange}
                  required
                />
              </div>
              {/*
              <div className="mb-3">
                <label htmlFor="department" className="form-label">
                  Department
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="Department"
                  name="Department"
                  value={employee.Department || ""}
                  onChange={handleInputChange}
                  required
                />
              </div>
            */}
              <div className="mb-3">
                <label htmlFor="department" className="form-label">
                  Department <span className="text-danger">*</span>
                </label>
                <select
                  className="form-select"
                  id="department"
                  name="Department"
                  value={employee.Department}
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
                Update Employee
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

export default EditEmployee;
