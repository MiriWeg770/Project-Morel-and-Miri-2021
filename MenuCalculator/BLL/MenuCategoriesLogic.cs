using DAL.Models;
using DTO;
using DTO.Convertors;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace BLL
{
    class MenuCategoriesLogic:IMenuCategoriesLogic
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
                return m;
            }
            catch (Exception e)
            {
                throw e;
            }
        }
  
        public MenuCategoriesDto DeletCategory(MenuCategoriesDto m)
        {
            throw new NotImplementedException();
        }

        public List<MenuCategoriesDto> GetAllCategories()
        {
            return MenuCategoriesConvertors.ToMenuCategoriesDtoList(_context.MenuCategories.ToList());

        }

        public MenuCategoriesDto GetCategoryById(int id)
        {
            throw new NotImplementedException();
        }

        public MenuCategoriesDto UpdateCategory(MenuCategoriesDto m)
        {
            throw new NotImplementedException();
        }
    }
}
