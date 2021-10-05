using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BLL;
using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LevelController : Controller
    {
        private ILevelLogic _logic;

        public LevelController(ILevelLogic logic)
        {
            _logic = logic;
        }

        [HttpGet]
        public IActionResult GetAllCategories()
        {
            return Ok(_logic.GetAllLevels());
        }
        [HttpGet("{id}")]
        public IActionResult GetLevelById(int id)
        {
            return Ok(_logic.GetLevelById(id));
        }

    }
}
