using DAL.Models;
using DTO;
using DTO.Convertors;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace BLL
{
    public class CategoriesToMenuLogic : ICategoriesToMenuLogic
    {
        private MenuCalculatorContext _context;

        public CategoriesToMenuLogic(MenuCalculatorContext context)
        {
            _context = context;
        }
        public CategoriesToMenuDto AddCategoriesToMenu(CategoriesToMenuDto u)
        {
            try
            {
                CategoriesToMenu m = CategoriesToMenuConvertors.ToCategoriesToMenu(u);
                _context.CategoriesToMenu.Add(m);
                _context.SaveChanges();
                return CategoriesToMenuConvertors.ToCategoriesToMenuDto(m);
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public CategoriesToMenuDto DeletCategoriesToMenu(CategoriesToMenuDto m)
        {
            throw new NotImplementedException();
        }

        public List<CategoriesToMenuDto> GetAllCategoriesToMenu()
        {
            return CategoriesToMenuConvertors.ToCategoriesToMenuDtoList(_context.CategoriesToMenu.ToList());
        }

        public CategoriesToMenuDto GetCategoriesToMenuLogicById(int id)
        {
            try
            {
                return CategoriesToMenuConvertors.ToCategoriesToMenuDto(_context.CategoriesToMenu.FirstOrDefault(p => p.CategoriesToMenuCode == id));
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public CategoriesToMenuDto UpdateCategoriesToMenu(CategoriesToMenuDto m)
        {
            throw new NotImplementedException();
        }
    }
}
//public static CategoriesToMenu ToCategoriesToMenu(CategoriesToMenuDto tm)
//{
//    return new CategoriesToMenu()
//    {
//        CategoriesToMenuCode = tm.CategoriesToMenuCode
//    };

//}
//public static CategoriesToMenuDto ToCategoriesToMenuDto(CategoriesToMenu tm)
//{
//    return new CategoriesToMenuDto()
//    {
//        CategoriesToMenuCode = tm.CategoriesToMenuCode
//    };
//}
//public static List<CategoriesToMenuDto> ToCategoriesToMenuDtoList(List<CategoriesToMenu> tList)
//{
//    List<CategoriesToMenuDto> tdList = new List<CategoriesToMenuDto>();
//    foreach (var item in tList)
//    {
//        tdList.Add(ToCategoriesToMenuDto(item));
//    }
//    return tdList;
//}
//public static List<CategoriesToMenu> ToCategoriesToMenuList(List<CategoriesToMenuDto> tList)
//{
//    List<CategoriesToMenu> tdList = new List<CategoriesToMenu>();
//    foreach (var item in tList)
//    {
//        tdList.Add(ToCategoriesToMenu(item));
//    }
//    return tdList;
//}
//    }
