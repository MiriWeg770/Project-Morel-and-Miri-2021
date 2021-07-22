using BLL;
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
        [HttpGet]
        public IActionResult GetAllMeals()
        {
            return Ok(_logic.GetAllMeals());
        }
        [HttpGet("{id}")]
        public IActionResult GetMealsById(int id)
        {
            return Ok(_logic.GetMealById(id));
        }

    }
}
