using BLL;
using DTO;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Controllers
{
    //[EnableCors("AllowOrigin")]
    [Route("api/[controller]")]
    [ApiController]
    public class MealsController : ControllerBase
    {
        private IMealLogic _logic;
        public MealsController(IMealLogic logic)
        {
            _logic = logic;
        }
        [HttpGet("GetAllMeals")]
        public IActionResult GetAllMeals()
        {
            return Ok(_logic.GetAllMeals());
        }
        [HttpGet("{id}")]
        public IActionResult GetMealsById(int id)
        {
            return Ok(_logic.GetMealById(id));
        }

        [HttpPost]
        public IActionResult AddMeal([FromBody] MealDto newMeal)
        {
            return Ok(_logic.AddMeal(newMeal));

        }

        [HttpPut]
        public IActionResult DeleteMeal([FromBody]MealDto newMeal)
        {
            return Ok(_logic.DeletMeal(newMeal));

        }
    }
}
