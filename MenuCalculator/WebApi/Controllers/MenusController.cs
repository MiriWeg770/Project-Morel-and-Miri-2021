using BLL;
using DTO.Convertors;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    //[EnableCors("AllowOrigin")]

    [ApiController]
    public class MenusController : ControllerBase
    {
        private IMenuLogic _logic;
        public MenusController(IMenuLogic logic)
        {
            _logic = logic;
        }
        [HttpGet]

        public IActionResult GetAllMenus()
        {
            return Ok(_logic.GetAllMenus());
        }
        [HttpGet("GetAllMenusByIdUser/:id")]

        public IActionResult GetAllMenusByIdUser(int id)
        {
            return Ok(_logic.GetAllMenusByIdUser(id));
        }
        
        [HttpGet("{id}")]
        public IActionResult GetMenuById(int id)
        {
            return Ok(_logic.GetMenuById(id));
        }

        [HttpPost("AddMenu")]
        public IActionResult AddMenu([FromBody] MenuDto menu)
        {
            return Ok(_logic.AddMenu(menu));

        }
    }
}
