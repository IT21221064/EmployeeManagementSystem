import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { deleteEmployee, getEmployees } from "../utils/ApiFunctions";
import EmployeePaginator from "../common/EmployeePaginator";
const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [employeesPerPage] = useState(2);

  useEffect(() => {
    fetchEmployees();
  }, []);

  useEffect(() => {
    // Update filtered employees based on current page
    const indexOfLastEmployee = currentPage * employeesPerPage;
    const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
    const currentEmployees = employees.slice(
      indexOfFirstEmployee,
      indexOfLastEmployee
    );
    setFilteredEmployees(currentEmployees);
  }, [currentPage, employees, employeesPerPage]);

  const fetchEmployees = async () => {
    setIsLoading(true);
    try {
      const result = await getEmployees();
      setEmployees(result);
      setIsLoading(false);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const handlePaginationClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const calculateTotalPages = () => {
    return Math.ceil(employees.length / employeesPerPage);
  };

  const handleDelete = async (employeeId) => {
    try {
      const success = await deleteEmployee(employeeId);
      if (success) {
        setEmployees(employees.filter((emp) => emp.EmployeeId !== employeeId));
      } else {
        setErrorMessage("Failed to delete employee");
      }
    } catch (error) {
      console.error("Error deleting employee:", error);
      setErrorMessage("Error deleting employee");
    }
  };

  return (
    <>
      <div className="container col-md-8 col-lg-6">
        {errorMessage && (
          <p className="alert alert-danger mt-5">{errorMessage}</p>
        )}
      </div>
      {isLoading ? (
        <p>Loading existing employees...</p>
      ) : (
        <section className="mt-5 mb-5 container">
          <div className="d-flex justify-content-between mb-5 mt-5">
            <h2>Existing Employees</h2>
          </div>
          <Row>
            <Col md={15} className="d-flex justify-content-end">
              <div className="ms-auto">
                <Link to={"/add-emp"} className="btn btn-primary">
                  Add Employee
                </Link>
              </div>
            </Col>
          </Row>
          <br />

          <table className="table table-bordered table-hover">
            <thead>
              <tr className="text-center">
                <th>Employee ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Address</th>
                <th>Mobile Number</th>
                <th>Email</th>
                <th>Birthday</th>
                <th>Date of Joining</th>
                <th>Department</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map((emp) => (
                <tr key={emp.EmployeeId} className="text-center">
                  <td>{emp.EmployeeId}</td>
                  <td>{emp.FirstName}</td>
                  <td>{emp.LastName}</td>
                  <td>{emp.Address}</td>
                  <td>{emp.MobileNumber}</td>
                  <td>{emp.Email}</td>
                  <td>{emp.Birthday}</td>
                  <td>{emp.DateOfJoining}</td>
                  <td>{emp.Department}</td>
                  <td className="gap-2">
                    <Link to={`/edit-emp/${emp.EmployeeId}`}>
                      <span className="btn btn-warning">Edit</span>
                    </Link>
                    <button
                      onClick={() => handleDelete(emp.EmployeeId)}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <EmployeePaginator
            currentPage={currentPage}
            totalPages={calculateTotalPages()}
            onPageChange={handlePaginationClick}
          />
        </section>
      )}
    </>
  );
};

export default EmployeeList;
