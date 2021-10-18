using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BLL;
using DTO;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controllers
{
    [EnableCors("AllowOrigin")]
    [Route("api/[controller]")]
    [ApiController]
    public class PictureController : ControllerBase
    {

        private IPictureLogic _logic;
        public PictureController(IPictureLogic logic)
        {
            _logic = logic;
        }
        [HttpPost("AddPicture")]
        public IActionResult AddPicture(PictureDto p)
        {
            return Ok(_logic.AddPicture(p));
        }
    }
}
