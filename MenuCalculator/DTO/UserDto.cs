using System;
using System.Collections.Generic;
using System.Text;

namespace DTO.Convertors
{
    public class UserDto
    {
        public int UserCode { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public string Mail { get; set; }
    }
}
