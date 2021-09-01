using DAL.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace DTO.Convertors
{
   public class CategoriesToMenuConvertors
    {
        public static CategoriesToMenu ToCategoriesToMenu(CategoriesToMenuDto m)
        {
            return new CategoriesToMenu()
            {
                CategoriesToMenuCode = m.CategoriesToMenuCode
            };

        }
        public static CategoriesToMenuDto ToCategoriesToMenuDto(CategoriesToMenu m)
        {
            return new CategoriesToMenuDto()
            {
                CategoriesToMenuCode = m.CategoriesToMenuCode
            };
        }
        public static List<CategoriesToMenuDto> ToCategoriesToMenuDtoList(List<CategoriesToMenu> mList)
        {
            List<CategoriesToMenuDto> mdList = new List<CategoriesToMenuDto>();
            foreach (var item in mList)
            {
                mdList.Add(ToCategoriesToMenuDto(item));
            }
            return mdList;
        }
        public static List<CategoriesToMenu> ToCategoriesToMenuList(List<CategoriesToMenuDto> mList)
        {
            List<CategoriesToMenu> mdList = new List<CategoriesToMenu>();
            foreach (var item in mList)
            {
                mdList.Add(ToCategoriesToMenu(item));
            }
            return mdList;
        }

    }
}
