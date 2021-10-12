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
        public string SendMail([FromBody]string E)
        {
            //בדיקה אם המייל קיים
            string Email = "kuhuugd@gmail.com";
            MailMessage m = new MailMessage();
            m.To.Add(Email);
            m.From = new MailAddress(E);
            m.Body = "jjjj";
            m.Subject = "test";
            SmtpClient s = new SmtpClient("smtp.gmail.com");
            s.EnableSsl = true;
            s.Port = 587;
            s.DeliveryMethod = SmtpDeliveryMethod.Network;
            s.Credentials = new NetworkCredential("kuhuugd@gmail.com", "12345678");
            try
            {
                s.Send(m);
                return "jjjj";
            }
            catch (Exception e)
            {
                throw e;
            }
            //}
            //        age = new MimeMessage();
            //        message.From.Add(new MailboxAddress("sss", "morel@"));
            //            message.To.Add(new MailboxAddress("sss", "morel@"));
            //            message.Subject = "test";
            //            message.Body = new TextPart("plain")
            //        {
            //            Text = "hello"
            //            };
            //            using (var client = new SmtpClient())
            //            {
            //                client.connect("smtp.gmail.com", 587, false);
            //                client.Send(message);
            //                client.Disconnect(true);
            //            }
            //return View();

            //try
            //{
            //    using(MailMessage mail =  new MailMessage())
            //    {
            //        mail.From = new MailAddress("morelchakima@gmail.com");
            //        mail.To.Add("morelchakima@gmail.com");
            //        mail.Subject = "test";
            //        mail.Body = "<h1>hello</h2>";
            //        mail.IsBodyHtml = true;

            //        using(SmtpClient s= new SmtpClient("smtp.gmail.com",587))
            //        {
            //            s.UseDefaultCredentials = false;
            //            s.EnableSsl = true;
            //            s.Send(mail);
            //        }
            //    }
            //}
            //catch(Exception ex)
            //{
            //    throw ex;
            //}
            //    MailMessage msg = new MailMessage();

            //    msg.From = new MailAddress("morelchaikma@gmail.com");
            //    msg.To.Add("morelchaikma@gmail.com");
            //    msg.Subject = "test";
            //    msg.Body = "Test Content";
            //    msg.Priority = MailPriority.High;

            //    SmtpClient client = new SmtpClient();

            //    client.Credentials = new NetworkCredential("mymailid", "mypassword", "smtp.gmail.com");
            //    client.Host = "smtp.gmail.com";
            //    client.Port = 587;
            //    client.DeliveryMethod = SmtpDeliveryMethod.Network;
            //    client.EnableSsl = true;
            //    client.UseDefaultCredentials = false;

            //    client.Send(msg);

            //}string content, string mail


        }

    }
}


