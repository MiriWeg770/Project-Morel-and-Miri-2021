using DAL.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace DTO.Convertors
{
   public class MealCategoriesConvertors
    {
        public static MealCategories ToMealCategories(MealCategoriesDto m)
        {
            return new MealCategories()
            {
                MealCategoriesCode = m.MealCategoriesCode,
                MealCategoriesName = m.MealCategoriesName,
                
            };

        }
        public static MealCategoriesDto ToMealCategoriesDto(MealCategories m)
        {
            return new MealCategoriesDto()
            {
                MealCategoriesCode = m.MealCategoriesCode,
                MealCategoriesName = m.MealCategoriesName
            };
        }



        public static List<MealCategoriesDto> ToMealCategoriesDtoList(List<MealCategories> mList)
        {
            List<MealCategoriesDto> mdList = new List<MealCategoriesDto>();
            foreach (var item in mList)
            {
                mdList.Add(ToMealCategoriesDto(item));
            }
            return mdList;
        }
        public static List<MealCategories> ToMealCategoriesList(List<MealCategoriesDto> mList)
        {
            List<MealCategories> mdList = new List<MealCategories>();
            foreach (var item in mList)
            {
                mdList.Add(ToMealCategories(item));
            }
            return mdList;
        }
    }
}
