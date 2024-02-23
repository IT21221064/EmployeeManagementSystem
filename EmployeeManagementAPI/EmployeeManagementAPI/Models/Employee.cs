using System;
using System.Collections.Generic;

namespace EmployeeManagementAPI.Models
{
    public class Employee
    {
        public int EmployeeId { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Address { get; set; }
        public string? MobileNumber { get; set; } // Assuming mobile number can be a string
        public string? Email { get; set; }
        public DateTime Birthday { get; set; }
        public List<Department> Departments { get; set; } // Collection of departments

        // Constructor for setting default values
        public Employee()
        {
            Birthday = DateTime.MinValue; // or any other default value you prefer
            Departments = new List<Department>();
        }
    }

}
