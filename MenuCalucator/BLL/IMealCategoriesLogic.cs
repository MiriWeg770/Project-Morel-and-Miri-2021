using DAL.Models;
using DTO;
using System;
using System.Collections.Generic;
using System.Text;

namespace BLL
{
   public interface IMealCategoriesLogic
    {
        List<MealCategoriesDto> GetAllCategories();
        MealCategoriesDto GetCategoryById(int id);
        MealCategoriesDto AddCategory(MealCategoriesDto m);
        MealCategoriesDto DeletCategory(MealCategoriesDto m);
        MealCategoriesDto UpdateCategory(MealCategoriesDto m);
    }
}
