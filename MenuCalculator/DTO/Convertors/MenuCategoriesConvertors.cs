using DAL.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace DTO.Convertors
{
    public class MenuCategoriesConvertors
    {
        public static MenuCategories ToMeunCategories(MenuCategoriesDto m)
        {
            return new MenuCategories()
            {
                MenuCategoriesCode = m.MenuCategoriesCode,
                MenuCategoriesName = m.MenuCategoriesName
            };

        }
        public static MenuCategoriesDto ToMenuCategoriesDto(MenuCategories m)
        {
            return new MenuCategoriesDto()
            {
               MenuCategoriesCode = m.MenuCategoriesCode,
                MenuCategoriesName = m.MenuCategoriesName
            };
        }



        public static List<MenuCategoriesDto> ToMenuCategoriesDtoList(List<MenuCategories> mList)
        {
            List<MenuCategoriesDto> mdList = new List<MenuCategoriesDto>();
            foreach (var item in mList)
            {
                mdList.Add(ToMenuCategoriesDto(item));
            }
            return mdList;
        }
        public static List<MenuCategories> ToMenuCategoriesList(List<MenuCategoriesDto> mList)
        {
            List<MenuCategories> mdList = new List<MenuCategories>();
            foreach (var item in mList)
            {
                mdList.Add(ToMeunCategories(item));
            }
            return mdList;
        }

    }
}
