using BLL;
using DTO;
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
    public class MealCategoriesController : ControllerBase
    {
        private IMealCategoriesLogic _logic;

        public MealCategoriesController(IMealCategoriesLogic logic)
        {
            _logic = logic;
        }

        [HttpGet]
        public IActionResult GetAllCategories()
        {
            return Ok(_logic.GetAllCategories());
        }

        [HttpGet("{id}")]
        public IActionResult GetCategoryById(int id)
        {
            return Ok(_logic.GetCategoryById(id));
        }
        [HttpPost("AddMealCategory")]
        public IActionResult AddCategory([FromBody] MealCategoriesDto m)
        {
            return Ok(_logic.AddCategory(m));
        }

        [HttpPut("DeleteMealCategory")]
        public IActionResult DeletCategory([FromBody] MealCategoriesDto m)
        {
            return Ok(_logic.DeletCategory(m));
        }

        [HttpPut("UpdateMealCategory")]
        public IActionResult UpdateCategory([FromBody] MealCategoriesDto m)
        {
            return Ok(_logic.UpdateCategory(m));
        }
    }
}
