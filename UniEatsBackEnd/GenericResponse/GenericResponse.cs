using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace UniEatsBackEnd.GenericResponse
{
    public class GenericResponse<T>
    {
        public bool Success { get; set; }

        public T? data { get; set; }

        public string? Msg { get; set; }
        
    }
}