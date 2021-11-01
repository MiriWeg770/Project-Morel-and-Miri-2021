using DAL.Models;
using DTO;
using DTO.Convertors;
using System;
using System.Collections.Generic;
using System.Text;

namespace BLL
{
    public interface IMenuLogic
    {
        List<MenuDto> GetAllMenus();
        List<MenuDto> GetAllMenusByIdUser(int id);
        MenuDto GetMenuById(int id);
        MenuDto GetMenuByName(string name);
        MenuDto AddMenuToUser(MenuDto u);
        MenuDto DeletMenu(MenuDto u);
        MenuDto UpdateMenu(MenuDto u);
        List<MealDto> GetMenuMeals(int id);
        void SendMenulInMail(string nameFrom, string from, string to, string message, MealDto meal);


        //   MenuDto IsExists(MenuDto b);

    }
}
