﻿using System;
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
        public string Birthday { get; set; }
        public List<Department> Departments { get; set; } // Collection of departments

        // Constructor for setting default values
        public Employee()
        {
            Departments = new List<Department>();
        }
    }

}
