using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace UniEatsBackEnd.DTO
{
    public class RegisterUser
    {
        [Required]
        [StringLength(50)]
        public string FirstName { get; set; }

        [Required]
        [StringLength(50)]
        public string LastName { get; set; }

        [Required]
        [StringLength(50)]
        [RegularExpression(@"^[a-zA-Z0-9_]+$", ErrorMessage = "Username must contain only alphanumeric characters or underscores.")]
        public string Username { get; set; }

        [Required]
        [StringLength(255)]
        public string Password { get; set; }

        [Required]
        [EmailAddress]
        [StringLength(100)]
        public string Email { get; set; }

        [Required]
        [RegularExpression(@"^(Owner|Worker|Customer)$", ErrorMessage = "Role must be 'Owner', 'Worker' or 'Customer'.")]
        public string Role { get; set; }

        [Phone]
        [StringLength(15)]
        [RegularExpression(@"^[0-9]+$", ErrorMessage = "Phone number must contain only digits.")]
        public string PhoneNumber { get; set; }
    }
}