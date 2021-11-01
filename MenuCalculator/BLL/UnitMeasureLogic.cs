using DAL.Models;
using DTO;
using DTO.Convertors;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace BLL
{
    public class UnitMeasureLogic : IUnitMeasureLogic
    {
        private MenuCalculatorContext _context;
        public UnitMeasureLogic(MenuCalculatorContext context)
        {
            _context = context;
        }
        public List<UnitMeasureDto> GetAllUnitMeasures()
        {
            return UnitMeasureConvertors.ToUnitMeasureDtoList(_context.UnitMeasure.ToList());
        }
    }
}
