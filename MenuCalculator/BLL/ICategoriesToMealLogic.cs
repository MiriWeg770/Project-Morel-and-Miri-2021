using DTO;
using System;
using System.Collections.Generic;
using System.Text;

namespace BLL
{
    public interface ICategoriesToMealLogic
    {
        List<CategoriesToMealDto> GetAllCategoriesToMeal();
        CategoriesToMealDto GetCategoriesToMealById(int id);
        CategoriesToMealDto AddCategoriesToMeal(CategoriesToMealDto m);
        CategoriesToMealDto DeletCategoriesToMeal(CategoriesToMealDto m);
        CategoriesToMealDto UpdateCategoriesToMeal(CategoriesToMealDto m);
    }
}
