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
    public class UnitMeasureController : Controller
    {
        private IUnitMeasureLogic _logic;

        public UnitMeasureController(IUnitMeasureLogic logic)
        {
            _logic = logic;
        }

        [HttpGet]
        public IActionResult GetAllCategories()
        {
            return Ok(_logic.GetAllUnitMeasures());
        }
    }
}
