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
            convert(varchar(10),DateOfJoining,120) as DateOfJoinning,Department 
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

                    int rowsAffected = myCommand.ExecuteNonQuery();
                    if (rowsAffected > 0)
                    {
                        return new JsonResult("Added Successfully");
                    }
                    else
                    {
                        return new JsonResult("Failed to add employee");
                    }
                }
            }
        }


    }
}