using BLL;
using DTO.Convertors;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    //[EnableCors("AllowOrigin")]

    [ApiController]
    public class MenusController : ControllerBase
    {

        private IMenuLogic _logic;
        public MenusController(IMenuLogic logic)
        {
            _logic = logic;
        }
        [HttpGet("GetAllUsersMenus")]
        public IActionResult GetAllUserMenus()
        {
            return Ok(_logic.GetAllUsersMenus());
        }
        [HttpGet]
        public IActionResult GetAllMenus()
        {
            return Ok(_logic.GetAllMenus());
        }

        [HttpGet("GetUserMenus/{id}")]
        public IActionResult GetAllMenusByIdUser(int id)
        {
            return Ok(_logic.GetAllMenusByIdUser(id));
        }

        [HttpGet("{id}")]
        public IActionResult GetMenuById(int id)
        {
            return Ok(_logic.GetMenuById(id));
        }

        [HttpPost("AddMenuToUser")]
        public IActionResult AddMenu([FromBody] MenuDto menu)
        {
            return Ok(_logic.AddMenuToUser(menu));
        }

        [HttpPut("UpdateMenu")]
        public IActionResult UpdateMenu([FromBody] MenuDto menu)
        {
            return Ok(_logic.UpdateMenu(menu));
        }
        [HttpPut("PublishMenu")]
        public IActionResult Publish([FromBody] MenuDto menu)
        {
            return Ok(_logic.Publish(menu));
        }
        [HttpPut("ChangeViewsNumber")]
        public IActionResult ChangeViewsNumber([FromBody] MenuDto menu)
        {
            return Ok(_logic.ChangeViewsNumber(menu));
        }
        [HttpPut("DeleteMenu")]
        public IActionResult DeleteMenu([FromBody] MenuDto Meal)
        {
            return Ok(_logic.DeletMenu(Meal));
        }
        [HttpGet("GetMenuMeals/{id}")]
        public IActionResult GetMenuMeals(int id)
        {
            return Ok(_logic.GetMenuMeals(id));
        }
        [HttpPut("MenuIsExists")]
        public IActionResult MenuIsExists([FromBody] MenuDto m)
        {
            return Ok(_logic.IsExists(m));
        }
        [HttpPost("SendMenuPDFinMail")]
        public IActionResult SendPDFinMail(string[] arr)
        {
            _logic.SendMenuInMail(arr[1], arr[0], arr[2]);
            return Ok(arr);

        }
        [HttpGet("GetMenuProducts/{id}")]
        public IActionResult GetMenuProducts(int id)
        {
            return Ok(_logic.GetMenuProducts(id));
        }

    }
}
