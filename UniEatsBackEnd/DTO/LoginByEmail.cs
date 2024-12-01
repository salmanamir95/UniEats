using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace UniEatsBackEnd.DTO
{
    public class LoginByEmail
    {
        public string? email { get; set; }

        public string? password { get; set; }
    }
}