using DAL.Models;
using DTO;
using DTO.Convertors;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace BLL
{
    public class MenuLogic : IMenuLogic
    {
        private MenuCalculatorContext _context;
        public MenuLogic(MenuCalculatorContext context)
        {
            _context = context;
        }

        //public MenuDto AddMenu(MenuDto u)
        //{
        //    try
        //    {
        //        Menu m = MenuConvertors.ToMenu(u);
        //        _context.Menu.Add(m);
        //        _context.SaveChanges();
        //        return MenuConvertors.ToMenuDto(m);
        //    }
        //    catch (Exception e)
        //    {
        //        throw e;
        //    }
        //}
        public MenuDto AddMenuToUser(MenuDto u)
        {
            _context.Users.FirstOrDefault(p => p.UserCode == u.UserCode).Menu.Add(MenuConvertors.ToMenu(u));
            _context.SaveChanges();
            return u;
        }

        public MenuDto DeletMenu(MenuDto u)
        {
            _context.Menu.Remove(MenuConvertors.ToMenu(u));
            _context.SaveChanges();
            return u;
        }

        public List<MenuDto> GetAllMenus()
        {
            return MenuConvertors.ToMenuDtoList(_context.Menu.Where(p => p.Publish == true).ToList());
        }

        public List<MenuDto> GetAllMenusByIdUser(int id)
        {
            return MenuConvertors.ToMenuDtoList(_context.Menu.Where(m => m.UserCode == id).ToList());
        }

        public MenuDto GetMenuById(int id)
        {
            try
            {
                return MenuConvertors.ToMenuDto(_context.Menu.FirstOrDefault(p => p.MenuCode == id));
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public MenuDto GetMenuByName(string name)
        {
            try
            {
                return MenuConvertors.ToMenuDto(_context.Menu.FirstOrDefault(p => p.MenuName == name));
            }
            catch (Exception e)
            {
                throw e;
            }
        }


        public MenuDto UpdateMenu(MenuDto u)
        {
            Menu U = _context.Menu.FirstOrDefault(w => w.MenuCode == u.MenuCode);
            if (u == null)
                return null;
            U.MenuName = u.MenuName;
            U.UserCode = u.UserCode;
            U.ViewsNumber = u.ViewsNumber;
            U.Links = u.Links;
            U.Discription = u.Discription;
            U.DateUpdated = u.DateUpdated;
            U.DateCreated = u.DateCreated;
            U.LevelCode = u.LevelCode;
            U.DateUpload = u.DateUpload;
            U.Publish = u.Publish;
            U.Meals = MealConvertors.ToMealList(u.Meals);



            _context.SaveChanges();
            return MenuConvertors.ToMenuDto(U);
        }

        public List<MealDto> GetMenuMeals(int id)
        {
            try
            {
                return MealConvertors.ToMealDtoList(_context.Meal.Where(p => p.MenuCode == id).ToList());
            }
            catch (Exception e)
            {
                throw e;
            }
        }
    }
}
