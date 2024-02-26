import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:5299/api/",
});

export async function getDepartments() {
  try {
    const response = await api.get("department");
    return response.data;
  } catch (error) {
    console.error("Error fetching departments:", error);
    throw new Error("Error fetching departments");
  }
}
export async function addEmployee(
  FirstName,
  LastName,
  Address,
  MobileNumber,
  Email,
  Birthday,
  DateOfJoining,
  Department
) {
  try {
    const response = await api.post("employee", {
      FirstName,
      LastName,
      Address,
      MobileNumber,
      Email,
      Birthday,
      DateOfJoining,
      Department,
    });

    if (response.status === 201) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error adding employee:", error);
    throw new Error("Error adding employee");
  }
}

export async function getEmployees() {
  try {
    const response = await api.get("employee");
    return response.data;
  } catch (error) {
    console.error("Error fetching employees:", error);
    throw new Error("Error fetching employees");
  }
}
// Update the updateEmployee function to send data in the correct format
export async function updateEmployee(employee) {
  try {
    const response = await api.put(`employee/${employee.EmployeeId}`, employee);

    return response.status; // Return the HTTP status code
  } catch (error) {
    console.error("Error updating employee:", error);
    throw new Error("Error updating employee");
  }
}

export async function deleteEmployee(EmployeeId) {
  try {
    const response = await api.delete(`employee/${EmployeeId}`);

    if (response.status === 200) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error deleting employee:", error);
    throw new Error("Error deleting employee");
  }
}
export async function getEmployee(EmployeeId) {
  try {
    const response = await api.get(`employee/${EmployeeId}`);
    return response;
  } catch (error) {
    console.error("Error fetching employee:", error);
    throw new Error("Error fetching employee");
  }
}
