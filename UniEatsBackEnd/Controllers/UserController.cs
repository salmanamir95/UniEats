using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace UniEatsBackEnd.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        
    }
}

// UC-01: Identify User
// UC-02: Login
// UC-03: Register
// UC-19: View Orders (related to user profile)


// _________________________________________________________

// User Management
// Forgot Password

// Allow users to reset their password via email or OTP.
// Use Case: Add a ForgotPassword method in the UserController.
// Edit Profile

// Allow users to update their personal details (e.g., name, email, phone).
// Use Case: Add an EditProfile method in the UserController.
// User Roles and Permissions

// Implement roles such as Admin, Staff, and Customer to control access.
// Use Case: Role-based functionality for admin and staff.