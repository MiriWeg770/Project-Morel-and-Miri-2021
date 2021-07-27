using DAL.Models;
using DTO;
using DTO.Convertors;
using System;
using System.Collections.Generic;
using System.Text;

namespace BLL
{
   public class MealCategoriesLogic : IMealCategoriesLogic

    {
        private MenuCalculatorContext _context;
        public MealCategoriesLogic(MenuCalculatorContext context)
        {
            _context = context;
        }
        public MealCategoriesDto AddCategory(MealCategoriesDto u)
        {
            try
            {
                //MealCategories m = MealCategoriesConvertors.ToMealCategories(u);
                //_context.MealCategories.Add(m);
                //_context.SaveChanges();
                //return MealCategoriesConvertors.ToMealCategoriesDto(m);
                return u; 
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public MealCategoriesDto DeletCategory(MealCategoriesDto m)
        {
            throw new NotImplementedException();
        }

        public List<MealCategoriesDto> GetAllCategories()
        {
            throw new NotImplementedException();
        }

        public MealCategoriesDto GetCategoryById(int id)
        {
            throw new NotImplementedException();
        }

        public MealCategoriesDto UpdateCategory(MealCategoriesDto m)
        {
            throw new NotImplementedException();
        }
    }
}
