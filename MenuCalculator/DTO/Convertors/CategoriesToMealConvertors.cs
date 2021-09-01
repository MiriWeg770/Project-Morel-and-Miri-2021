using DAL.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace DTO.Convertors
{
    public class CategoriesToMealConvertors
    {
        public static CategoriesToMeal ToCategoriesToMeal(CategoriesToMealDto tm)
        {
            return new CategoriesToMeal()
            {
                CategoriesToMealCode = tm.CategoriesToMealCode
            };

        }
        public static CategoriesToMealDto ToCategoriesToMealDto(CategoriesToMeal tm)
        {
            return new CategoriesToMealDto()
            {
                CategoriesToMealCode = tm.CategoriesToMealCode
            };
        }
        public static List<CategoriesToMealDto> ToCategoriesToMealDtoList(List<CategoriesToMeal> tList)
        {
            List<CategoriesToMealDto> tdList = new List<CategoriesToMealDto>();
            foreach (var item in tList)
            {
                tdList.Add(ToCategoriesToMealDto(item));
            }
            return tdList;
        }
        public static List<CategoriesToMeal> ToCategoriesToMealList(List<CategoriesToMealDto> tList)
        {
            List<CategoriesToMeal> tdList = new List<CategoriesToMeal>();
            foreach (var item in tList)
            {
                tdList.Add(ToCategoriesToMeal(item));
            }
            return tdList;
        }
    }
}
