using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BLL;
using DTO;
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
        [HttpPost("AddUnitMeasure")]
        public IActionResult AddUnitMeasure([FromBody] UnitMeasureDto m)
        {
            return Ok(_logic.AddUnitMeasures(m));
        }

        [HttpPut("DeleteUnitMeasure")]
        public IActionResult DeleteUnitMeasure([FromBody] UnitMeasureDto m)
        {
            return Ok(_logic.DeleteUnitMeasures(m));
        }

        [HttpPut("UpdateUnitMeasure")]
        public IActionResult UpdateUnitMeasure([FromBody] UnitMeasureDto m)
        {
            return Ok(_logic.UpdateUnitMeasures(m));
        }
    }
}
