using BLL;
using DTO;
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
    public class MenuCategoriesController : ControllerBase
    {
        private IMenuCategoriesLogic _logic;

        public MenuCategoriesController(IMenuCategoriesLogic logic)
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

        [HttpPost("AddMenuCategory")]
        public IActionResult AddCategory([FromBody] MenuCategoriesDto m)
        {
            return Ok(_logic.AddCategory(m));
        }

        [HttpPut("DeleteMenuCategory")]
        public IActionResult DeletCategory([FromBody] MenuCategoriesDto m)
        {
            return Ok(_logic.DeletCategory(m));
        }

        [HttpPut("UpdateMenuCategory")]
        public IActionResult UpdateCategory([FromBody] MenuCategoriesDto m)
        {
            return Ok(_logic.UpdateCategory(m));
        }
    }
}
