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
        List<MenuDto> GetAllUsersMenus();
        List<MenuDto> GetAllMenus();
        List<MenuDto> GetAllMenusByIdUser(int id);
        MenuDto GetMenuById(int id);
        MenuDto GetMenuByName(string name);
        MenuDto AddMenuToUser(MenuDto u);
        MenuDto DeletMenu(MenuDto u);
        MenuDto UpdateMenu(MenuDto u);
        MenuDto ChangeViewsNumber(MenuDto u);
        MenuDto Publish(MenuDto u);
        List<MealDto> GetMenuMeals(int id);
        List<ProductDto> GetMenuProducts(int id);
        void SendMenuInMail(string to, string from, string menu);
        bool IsExists(MenuDto b);

    }
}
