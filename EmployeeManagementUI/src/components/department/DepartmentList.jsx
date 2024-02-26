import React, { useState, useEffect } from "react";
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
    <div>
      <h2>Department List</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Department ID</th>
            <th>Department Name</th>
          </tr>
        </thead>
        <tbody>
          {departments.map((department) => (
            <tr key={department.DeptId}>
              <td>{department.DeptId}</td>
              <td>{department.DeptName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DepartmentList;
