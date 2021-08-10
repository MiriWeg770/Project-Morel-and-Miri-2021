using DAL.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace DTO.Convertors
{
    public class MenuConvertors
    {
        public static MenuDto ToMenuDto(Menu m)
        {
            return new MenuDto()
            {
                DateCreated = m.DateCreated,
                DateUpdated = m.DateUpdated,
                Discription = m.Discription,
                Links = m.Links,
                MenuCode = m.MenuCode,
                MenuName = m.MenuName,
                UserCode = m.UserCode,
                ViewsNumber = m.ViewsNumber,
                UserName = m.User != null ? m.User.UserName : default(string)
            };
        }
        public static Menu ToMenu(MenuDto m)
        {
            return new Menu()
            {
                DateCreated = m.DateCreated,
                DateUpdated = m.DateUpdated,
                Discription = m.Discription,
                Links = m.Links,
                MenuCode = m.MenuCode,
                MenuName = m.MenuName,
                UserCode = m.UserCode,
                ViewsNumber = m.ViewsNumber,

            };

        }
        public static List<MenuDto> ToMenuDtoList(List<Menu> mList)
        {
            List<MenuDto> mdList = new List<MenuDto>();
            foreach (var item in mList)
            {
                mdList.Add(ToMenuDto(item));
            }
            return mdList;
        }
        public static List<Menu> ToMenuList(List<MenuDto> mList)
        {
           List<Menu> mdList = new List<Menu>();
            foreach (var item in mList)
            {
                mdList.Add(ToMenu(item));
            }
            return mdList;
        }
        
    }
}
