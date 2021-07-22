using DAL.Models;
using DTO;
using System;
using System.Collections.Generic;
using System.Text;

namespace BLL
{
   public interface IMealLogic
    {
        List<MealDto> GetAllMeals();
        MealDto GetMealById(int id);
        MealDto AddMeal(MealDto u);
        MealDto DeletMeal(MealDto u);
        MealDto UpdateMeal(MealDto u);
      //  MealDto IsExists(MealDto b);

    }
}
