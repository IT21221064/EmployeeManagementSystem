using EmployeeManagementAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Data.SqlClient;

namespace EmployeeManagementAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public EmployeeController(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        [HttpGet]
        public JsonResult Get()
        {
            string query = @"select EmployeeId, FirstName, LastName, Address,MobileNumber,Email,
            convert(varchar(10),Birthday,120) as Birthday,
            convert(varchar(10),DateOfJoining,120) as DateOfJoining,Department 
            from dbo.Employee  
            ORDER BY DateOfJoining";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("DefaultConnection");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult(table);
        }

          [HttpPost]
          public JsonResult Post(Employee emp)
          {
              string query = @"INSERT INTO dbo.Employee (FirstName, LastName, Address, MobileNumber, Email, Birthday, DateOfJoining, Department) 
                       VALUES (@FirstName, @LastName, @Address, @MobileNumber, @Email, @Birthday, @DateOfJoining, @Department)";

              string duplicateCheckQuery = @"SELECT COUNT(*) FROM dbo.Employee WHERE MobileNumber = @MobileNumber OR Email = @Email";

              DataTable table = new DataTable();
              string sqlDataSource = _configuration.GetConnectionString("DefaultConnection");
              SqlDataReader myReader;
              using (SqlConnection myCon = new SqlConnection(sqlDataSource))
              {
                  myCon.Open();

                  // Check for duplicate mobile number or email
                  using (SqlCommand duplicateCheckCommand = new SqlCommand(duplicateCheckQuery, myCon))
                  {
                      duplicateCheckCommand.Parameters.AddWithValue("@MobileNumber", emp.MobileNumber);
                      duplicateCheckCommand.Parameters.AddWithValue("@Email", emp.Email);
                      int duplicateCount = (int)duplicateCheckCommand.ExecuteScalar();

                      if (duplicateCount > 0)
                      {
                          return new JsonResult("Mobile number or email already exists");
                      }
                  }

                  // Insert the employee if mobile number and email are unique
                  using (SqlCommand myCommand = new SqlCommand(query, myCon))
                  {
                      myCommand.Parameters.AddWithValue("@FirstName", emp.FirstName);
                      myCommand.Parameters.AddWithValue("@LastName", emp.LastName);
                      myCommand.Parameters.AddWithValue("@Address", emp.Address);
                      myCommand.Parameters.AddWithValue("@MobileNumber", emp.MobileNumber);
                      myCommand.Parameters.AddWithValue("@Email", emp.Email);
                      myCommand.Parameters.AddWithValue("@Birthday", emp.Birthday);
                      myCommand.Parameters.AddWithValue("@DateOfJoining", emp.DateOfJoining);
                      myCommand.Parameters.AddWithValue("@Department", emp.Department);

                      myReader = myCommand.ExecuteReader();
                      table.Load(myReader);
                      myReader.Close();
                      myCon.Close();
                  }
              }
              return new JsonResult("Added Successfully");
          }
        

      /*  [HttpPost]
        public JsonResult Post(Employee emp)
        {
            // Construct the query to insert the employee into the Employee table
            string employeeInsertQuery = @"
        INSERT INTO dbo.Employee (FirstName, LastName, Address, MobileNumber, Email, Birthday, DateOfJoining) 
        VALUES (@FirstName, @LastName, @Address, @MobileNumber, @Email, @Birthday, @DateOfJoining);
        SELECT SCOPE_IDENTITY();";

            // Construct the query to insert department assignments into the junction table
            string departmentInsertQuery = @"
        INSERT INTO dbo.EmployeeDepartment (EmployeeId, DeptId) 
        VALUES (@EmployeeId, @DeptId)";

            // Initialize variables
            string sqlDataSource = _configuration.GetConnectionString("DefaultConnection");
            DataTable table = new DataTable();
            SqlDataReader myReader;
            int employeeId;

            // Open connection and start transaction
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                SqlTransaction transaction = myCon.BeginTransaction();

                try
                {
                    // Insert employee details
                    using (SqlCommand employeeCommand = new SqlCommand(employeeInsertQuery, myCon, transaction))
                    {
                        // Add parameters for employee details
                        employeeCommand.Parameters.AddWithValue("@FirstName", emp.FirstName);
                        employeeCommand.Parameters.AddWithValue("@LastName", emp.LastName);
                        employeeCommand.Parameters.AddWithValue("@Address", emp.Address);
                        employeeCommand.Parameters.AddWithValue("@MobileNumber", emp.MobileNumber);
                        employeeCommand.Parameters.AddWithValue("@Email", emp.Email);
                        employeeCommand.Parameters.AddWithValue("@Birthday", emp.Birthday);
                        employeeCommand.Parameters.AddWithValue("@DateOfJoining", emp.DateOfJoining);

                        // Execute the command and get the generated employee ID
                        employeeId = Convert.ToInt32(employeeCommand.ExecuteScalar());
                    }

                    // Insert department assignments
                    foreach (string department in emp.Departments)
                    {
                        using (SqlCommand departmentCommand = new SqlCommand(departmentInsertQuery, myCon, transaction))
                        {
                            // Add parameters for department assignment
                            departmentCommand.Parameters.AddWithValue("@EmployeeId", employeeId);
                            departmentCommand.Parameters.AddWithValue("@DeptId", GetDepartmentIdByName(department)); // Implement this method to get department ID by name

                            // Execute the command
                            departmentCommand.ExecuteNonQuery();
                        }
                    }

                    // Commit transaction
                    transaction.Commit();

                    // Return success message
                    return new JsonResult("Added Successfully");
                }
                catch (Exception ex)
                {
                    // Rollback transaction if an error occurs
                    transaction.Rollback();
                    Console.WriteLine("Error: " + ex.Message);
                    return new JsonResult("Error adding employee: " + ex.Message);
                }
                finally
                {
                    // Close connection
                    myCon.Close();
                }
            }
        }


        private int GetDepartmentIdByName(string departmentName)
        {
            string query = "SELECT DeptId FROM dbo.Department WHERE DeptName = @DepartmentName";
            string connectionString = _configuration.GetConnectionString("DefaultConnection");

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                using (SqlCommand command = new SqlCommand(query, connection))
                {
                    command.Parameters.AddWithValue("@DepartmentName", departmentName);
                    connection.Open();
                    var result = command.ExecuteScalar();
                    connection.Close();
                    if (result != null)
                    {
                        return Convert.ToInt32(result);
                    }
                    else
                    {
                        throw new Exception($"Department with name {departmentName} not found.");
                    }
                }
            }
        }



        */

        [HttpPut("{id}")]
        public JsonResult Put(int id, [FromBody] Employee emp)
        {
            string query = @"UPDATE dbo.Employee
            SET FirstName = @FirstName,
                LastName = @LastName,
                Address = @Address,
                MobileNumber = @MobileNumber,
                Email = @Email,
                Birthday = @Birthday,
                DateOfJoining = @DateOfJoining,
                Department = @Department
            WHERE EmployeeId = @EmployeeId";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("DefaultConnection");
            SqlDataReader myReader;

            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();

                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@EmployeeId", id);
                    myCommand.Parameters.AddWithValue("@FirstName", emp.FirstName);
                    myCommand.Parameters.AddWithValue("@LastName", emp.LastName);
                    myCommand.Parameters.AddWithValue("@Address", emp.Address);
                    myCommand.Parameters.AddWithValue("@MobileNumber", emp.MobileNumber);
                    myCommand.Parameters.AddWithValue("@Email", emp.Email);
                    myCommand.Parameters.AddWithValue("@Birthday", emp.Birthday);
                    myCommand.Parameters.AddWithValue("@DateOfJoining", emp.DateOfJoining);
                    myCommand.Parameters.AddWithValue("@Department", emp.Department);

                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult("Updated Successfully");
        }


        [HttpDelete("{id}")] // Specify the route parameter for the employee ID
        public JsonResult Delete(int id)
        {
            string query = @"DELETE FROM dbo.Employee
                    WHERE EmployeeId = @EmployeeId";

            string sqlDataSource = _configuration.GetConnectionString("DefaultConnection");

            try
            {
                using (SqlConnection myCon = new SqlConnection(sqlDataSource))
                {
                    using (SqlCommand myCommand = new SqlCommand(query, myCon))
                    {
                        myCommand.Parameters.AddWithValue("@EmployeeId", id); // Use the id parameter

                        myCon.Open();
                        int rowsAffected = myCommand.ExecuteNonQuery(); // Execute the delete command
                        myCon.Close();

                        if (rowsAffected > 0)
                        {
                            return new JsonResult("Deleted Successfully");
                        }
                        else
                        {
                            return new JsonResult("Employee with ID " + id + " not found");
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                // Log the error or return an error message
                Console.WriteLine("Error deleting employee: " + ex.Message);
                return new JsonResult("Error deleting employee: " + ex.Message);
            }
        }


        [HttpGet("{id}")]
        public JsonResult Get(int id)
        {
            string query = @"SELECT EmployeeId, FirstName, LastName, Address, MobileNumber, Email,
                         CONVERT(varchar(10), Birthday, 120) AS Birthday,
                         CONVERT(varchar(10), DateOfJoining, 120) AS DateOfJoining, Department 
                    FROM dbo.Employee  
                   WHERE EmployeeId = @EmployeeId";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("DefaultConnection");

            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@EmployeeId", id);

                    try
                    {
                        myCon.Open();
                        SqlDataReader myReader = myCommand.ExecuteReader();
                        table.Load(myReader);
                        myReader.Close();
                    }
                    catch (Exception ex)
                    {
                        // Handle exception, log error, etc.
                        Console.WriteLine("Error: " + ex.Message);
                    }
                }
            }

            return new JsonResult(table);
        }


    }
}