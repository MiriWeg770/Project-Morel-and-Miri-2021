using DAL.Models;
using DTO;
using DTO.Convertors;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace BLL
{
   public class MealLogic : IMealLogic
    {
        private MenuCalculatorContext _context;
        public MealLogic(MenuCalculatorContext context)
        {
            _context = context;
        }
      

        public MealDto AddMeal(MealDto u)
        {
            try
            {
                Meal m = MealConvertors.ToMeal(u);
                //_context.Meal.Add(m);
                AddMealToUser(u);       
                _context.SaveChanges();

                return MealConvertors.ToMealDto(m);
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public MealDto AddMealToUser(MealDto u)
        {
          
            _context.Users.FirstOrDefault(p => p.UserCode == u.UserCode).Meal.Add(MealConvertors.ToMeal(u));          
            _context.SaveChanges();
            return u;
        }

        public MealDto DeletMeal(MealDto u)
        {
            Meal m = _context.Meal.FirstOrDefault(p => p.MealCode == u.MealCode);
             //MealConvertors.ToMeal(u);
            _context.Meal.Remove(m);
            _context.SaveChanges();
            return u;
        }

        public List<MealDto> GetAllMeals()
        {
            return MealConvertors.ToMealDtoList(_context.Meal.ToList());
        }

        public MealDto GetMealById(int id)
        {
            try
            {
                return MealConvertors.ToMealDto(_context.Meal.FirstOrDefault(p => p.MealCode == id));
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public List<MealDto> GetUserMeals(int id)
        {
         return MealConvertors.ToMealDtoList(_context.Meal.Where(p => p.UserCode == id).ToList());
           
        }

        public MealDto UpdateMeal(MealDto u)
        {
            Meal U = _context.Meal.FirstOrDefault(w => w.MealCode == u.MealCode);
            U.MealName = u.MealName;
            U.NumberOfDiners = u.NumberOfDiners;
            U.NumberOfViews = u.NumberOfViews;
            U.UserCode = u.UserCode;
            U.Discription = u.Discription;
            U.Instructions = u.Instructions;
            U.MealCategoryCode = u.MealCategoryCode;
           
            if (U == null)
                return null;
           
            _context.SaveChanges();
            return MealConvertors.ToMealDto(U);
        }


    }
}
