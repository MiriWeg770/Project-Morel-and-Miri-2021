﻿using Chilkat;
using DAL.Models;
using DTO;
using Microsoft.AspNetCore.Http;
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
        MealDto AddMealToUser(MealDto u);
        List<MealDto> GetUserMeals(int id);
        List<ProductDto> GetMealProducts(int id);
        MealDto DeletMeal(MealDto u);
        MealDto UpdateMeal(MealDto u);
        void SendMealInMail(string to, string from, string meal);
        bool IsExists(MealDto b);

    }
}
