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
        [HttpGet("GetUserMeals/{id}")]
        public IActionResult GetUserMeals(int id)
        {
            return Ok(_logic.GetUserMeals(id));
        }

        [HttpGet("{id}")]
        public IActionResult GetMealsById(int id)
        {
            return Ok(_logic.GetMealById(id));
        }

        [HttpPost("AddMeal")]
        public IActionResult AddMeal([FromBody] MealDto meal)
        {
            return Ok(_logic.AddMeal(meal));

        }

        [HttpPut("DeleteMeal")]
        public IActionResult DeleteMeal([FromBody]MealDto Meal)
        {
            return Ok(_logic.DeletMeal(Meal));

        }

        [HttpPut("UpdateMeal")]
        public IActionResult UpdateMeal([FromBody] MealDto Meal)
        {
            return Ok(_logic.UpdateMeal(Meal));

        }

        [HttpPost("AddMealToUser")]
        public IActionResult AddMealToUser([FromBody] MealDto meal)
        {
            return Ok(_logic.AddMealToUser(meal));

        }

        [HttpGet("GetProductsMeal/{id}")]
        public IActionResult GetProductsById(int id)
        {
            return Ok(_logic.GetMealProducts(id));
        }
        

    }
}
