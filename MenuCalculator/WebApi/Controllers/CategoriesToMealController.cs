using BLL;
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
    public class CategoriesToMealController : ControllerBase
    {
        private ICategoriesToMealLogic _logic;

        public CategoriesToMealController(ICategoriesToMealLogic logic)
        {
            _logic = logic;
        }

        [HttpGet]
        public IActionResult GetAllCategoriesToMeal()
        {
            return Ok(_logic.GetAllCategoriesToMeal());
        }

        [HttpGet("{id}")]
        public IActionResult GetCategoriesToMealById(int id)
        {
            return Ok(_logic.GetCategoriesToMealById(id));
        }
        [HttpPost("AddCategoriesToMeal")]
        public IActionResult AddCategoriesToMeal([FromBody] CategoriesToMealDto m)
        {
            return Ok(_logic.AddCategoriesToMeal(m));
        }

        [HttpPut("DeletCategoriesToMeal")]
        public IActionResult DeletCategoriesToMeal([FromBody] CategoriesToMealDto m)
        {
            return Ok(_logic.DeletCategoriesToMeal(m));
        }

        [HttpPut("UpdateCategoriesToMeal")]
        public IActionResult UpdateCategoriesToMeal([FromBody] CategoriesToMealDto m)
        {
            return Ok(_logic.UpdateCategoriesToMeal(m));
        }
    }
}
