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
                _context.Meal.Add(m);
                _context.SaveChanges();
                return MealConvertors.ToMealDto(m);
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public MealDto DeletMeal(MealDto u)
        {
            _context.Meal.Remove(MealConvertors.ToMeal(u));
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

        public MealDto UpdateMeal(MealDto u)
        {
            Meal U = _context.Meal.FirstOrDefault(w => w.MealCode == u.MealCode);
            if (u == null)
                return null;
           
            _context.SaveChanges();
            return MealConvertors.ToMealDto(U);
        }


    }
}
