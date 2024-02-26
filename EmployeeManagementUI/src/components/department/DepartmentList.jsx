import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getDepartments } from "../utils/ApiFunctions";

const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const departmentData = await getDepartments();
        setDepartments(departmentData);
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };

    fetchDepartments();
  }, []);

  return (
    <>
      <div className="container col-md-8 col-lg-6">
        <h2 className="mt-5 mb-5">Department List</h2>
      </div>
      <section className="mt-5 mb-5 container">
        <table className="table table-bordered table-hover">
          <thead>
            <tr className="text-center">
              <th>Department ID</th>
              <th>Department Name</th>
            </tr>
          </thead>
          <tbody>
            {departments.map((department) => (
              <tr key={department.DeptId} className="text-center">
                <td>{department.DeptId}</td>
                <td>{department.DeptName}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <Link to={"/"} className="btn btn-outline-info">
          Back
        </Link>
      </section>
    </>
  );
};

export default DepartmentList;
