using DTO;
using System;
using System.Collections.Generic;
using System.Text;

namespace BLL
{
   public interface IMenuCategoriesLogic
    {
        List<MenuCategoriesDto> GetAllCategories();
        MenuCategoriesDto GetCategoryById(int id);
        MenuCategoriesDto AddCategory(MenuCategoriesDto m);
        MenuCategoriesDto DeletCategory(MenuCategoriesDto m);
        MenuCategoriesDto UpdateCategory(MenuCategoriesDto m);
    }
}
