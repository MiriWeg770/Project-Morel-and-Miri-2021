using DAL.Models;
using DTO;
using DTO.Convertors;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace BLL
{
    public class CategoriesToMealLogic : ICategoriesToMealLogic
    {
        private MenuCalculatorContext _context;
        public CategoriesToMealLogic(MenuCalculatorContext context)
        {
            _context = context;
        }
        public CategoriesToMealDto AddCategoriesToMeal(CategoriesToMealDto u)
        {
            try
            {
                CategoriesToMeal m = CategoriesToMealConvertors.ToCategoriesToMeal(u);
                _context.CategoriesToMeal.Add(m);
                _context.SaveChanges();
                return CategoriesToMealConvertors.ToCategoriesToMealDto(m);
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public CategoriesToMealDto DeletCategoriesToMeal(CategoriesToMealDto m)
        {
            throw new NotImplementedException();
        }

        public List<CategoriesToMealDto> GetAllCategoriesToMeal()
        {
            return CategoriesToMealConvertors.ToCategoriesToMealDtoList(_context.CategoriesToMeal.ToList());
        }

        public CategoriesToMealDto GetCategoriesToMealById(int id)
        {

            try
            {
                return CategoriesToMealConvertors.ToCategoriesToMealDto(_context.CategoriesToMeal.FirstOrDefault(p => p.CategoriesToMealCode == id));
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public CategoriesToMealDto UpdateCategoriesToMeal(CategoriesToMealDto m)
        {
            throw new NotImplementedException();
        }
    }
}
