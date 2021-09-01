using BLL;
using DAL.Models;
using DTO;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesToMenuController : ControllerBase
    {
        private ICategoriesToMenuLogic _logic;

        public CategoriesToMenuController(ICategoriesToMenuLogic logic)
        {
            _logic = logic;
        }

        [HttpGet]
        public IActionResult GetAllCategoriesToMenu()
        {
            return Ok(_logic.GetAllCategoriesToMenu());
        }

        [HttpGet("{id}")]
        public IActionResult GetCategoriesToMenuLogicById(int id)
        {
            return Ok(_logic.GetCategoriesToMenuLogicById(id));
        }
        [HttpPost("AddCategoriesToMenu")]
        public IActionResult AddCategoriesToMenu([FromBody] CategoriesToMenuDto m)
        {
            return Ok(_logic.AddCategoriesToMenu(m));
        }

        [HttpPut("DeletCategoriesToMenu")]
        public IActionResult DeletCategoriesToMenu([FromBody] CategoriesToMenuDto m)
        {
            return Ok(_logic.DeletCategoriesToMenu(m));
        }

        [HttpPut("UpdateCategoriesToMenu")]
        public IActionResult UpdateCategoriesToMenu([FromBody] CategoriesToMenuDto m)
        {
            return Ok(_logic.UpdateCategoriesToMenu(m));
        }
    }
}
    





