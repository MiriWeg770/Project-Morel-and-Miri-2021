using DTO;
using System;
using System.Collections.Generic;
using System.Text;

namespace BLL
{
   public interface ICategoriesToMenuLogic
    {
        List<CategoriesToMenuDto> GetAllCategoriesToMenu();
        CategoriesToMenuDto GetCategoriesToMenuLogicById(int id);
        CategoriesToMenuDto AddCategoriesToMenu(CategoriesToMenuDto m);
        CategoriesToMenuDto DeletCategoriesToMenu(CategoriesToMenuDto m);
        CategoriesToMenuDto UpdateCategoriesToMenu(CategoriesToMenuDto m);
    }
}
