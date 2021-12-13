using DAL.Models;
using DTO;
using DTO.Convertors;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace BLL
{
   public class MenuCategoriesLogic:IMenuCategoriesLogic
    {
        private MenuCalculatorContext _context;

        public MenuCategoriesLogic(MenuCalculatorContext context)
        {
            _context = context;
        }

        public MenuCategoriesDto AddCategory(MenuCategoriesDto m)
        {
            try
            {
                MenuCategories m1 = MenuCategoriesConvertors.ToMeunCategories(m);
                _context.MenuCategories.Add(m1);
                _context.SaveChanges();
                return MenuCategoriesConvertors.ToMenuCategoriesDto(m1);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
  
        public MenuCategoriesDto DeletCategory(MenuCategoriesDto m)
        {
            _context.MenuCategories.Remove(MenuCategoriesConvertors.ToMeunCategories(m));
            _context.SaveChanges();
            return m;
        }

        public List<MenuCategoriesDto> GetAllCategories()
        {
            return MenuCategoriesConvertors.ToMenuCategoriesDtoList(_context.MenuCategories.ToList());

        }

        public MenuCategoriesDto GetCategoryById(int id)
        {
            try
            {
                return MenuCategoriesConvertors.ToMenuCategoriesDto(_context.MenuCategories.FirstOrDefault(p => p.MenuCategoriesCode == id));
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public MenuCategoriesDto UpdateCategory(MenuCategoriesDto m)
        {
            throw new NotImplementedException();
        }
    }
}
