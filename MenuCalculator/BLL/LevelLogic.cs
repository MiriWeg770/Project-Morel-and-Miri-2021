using DAL.Models;
using DTO;
using DTO.Convertors;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace BLL
{
      public class LevelLogic : ILevelLogic
    {
        private MenuCalculatorContext _context;
        public LevelLogic(MenuCalculatorContext context)
        {
            _context = context;
        }
     
        public List<LevelDto> GetAllLevels()
        {
            
            return LevelConvertors.ToLevelDtoList(_context.Level.ToList());
        }

        public LevelDto GetLevelById(int id)
        {
            try
            {
                return LevelConvertors.ToLevelDto(_context.Level.FirstOrDefault(p => p.LevelCode == id));
            }
            catch (Exception e)
            {
                throw e;
            }
        }
    }
}
