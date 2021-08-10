using DAL.Models;
using DTO.Convertors;
using System;
using System.Collections.Generic;
using System.Text;

namespace BLL
{
    public interface IMenuLogic
    {
        List<MenuDto> GetAllMenus();
        MenuDto GetMenuById(int id);
        MenuDto GetMenuByName(string name);
        MenuDto AddMenu(MenuDto u);
        MenuDto DeletMenu(MenuDto u);
        MenuDto UpdateMenu(MenuDto u);
     //   MenuDto IsExists(MenuDto b);

    }
}
