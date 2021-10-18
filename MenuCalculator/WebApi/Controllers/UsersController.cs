using BLL;
using DAL.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DTO.Convertors;
using System.Net.Mail;
using System.Net;
using DTO;

namespace WebApi.Controllers
{
    [EnableCors("AllowOrigin")]
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private IUserLogic _logic;
        public UsersController(IUserLogic logic)
        {
            _logic = logic;
        }
        [HttpGet]
        public IActionResult GetAllUsers()
        {
            return Ok(_logic.GetAllUsers());
        }
        [HttpGet("{id}")]
        public IActionResult GetUserById(int id)
        {
            return Ok(_logic.GetUserById(id));
        }
        //[HttpPost]
        //public IActionResult AddUser([FromBody] UserDto b)
        //{
        //    if (_logic.IsExists(b))
        //        return StatusCode(409, "קיים כבר משתמש בשם זה");
        //    return Ok(_logic.AddUser(b));
        //}
        [HttpPost("SignIn")]
        public IActionResult SignIn(UserDto u)
        {
            if (!_logic.IsExists(u))
                return NotFound("מצטערים אין כזה משתמש");
            return Ok(_logic.SignIn(u.UserName, u.Password));
        }
        [HttpPost("SignUp")]
        public IActionResult SignUp([FromBody] UserDto u)
        {
            try
            {
                if (_logic.IsExists(u))
                    return Conflict("מצטערים כבר יש כזה משתמש");
                return Ok(_logic.SignUp(u.UserName, u.Mail, u.Password));
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        [HttpPost("Update")]
        public IActionResult Update(UserDto u)
        {
            if (!_logic.IsExists(u))
                return NotFound("מצטערים אין כזה משתמש");
            return Ok(_logic.UpdateUser(u));
        }

        [HttpPost("SendMail")]
        public IActionResult SendMail([FromBody] UserDto E)
        {
            string s = _logic.ResetPassword(E.Mail);
            E.Password = s;
            if(s!= null)
                return Ok(E);
            return NotFound("מצטערים אין כזה מייל");

        }
        [HttpPost("SendPDFinMail")]
        public void SendPDFinMail([FromBody] UserDto E)
        {
           

        }

    }
}


