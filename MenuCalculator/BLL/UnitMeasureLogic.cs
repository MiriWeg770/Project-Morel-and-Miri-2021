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

        public UnitMeasureDto AddUnitMeasures(UnitMeasureDto m)
        {
            _context.UnitMeasure.Add(UnitMeasureConvertors.ToUnitMeasure(m));
            _context.SaveChanges();
            return m;
        }

        public UnitMeasureDto DeleteUnitMeasures(UnitMeasureDto m)
        {
            _context.UnitMeasure.Remove(UnitMeasureConvertors.ToUnitMeasure(m));
            _context.SaveChanges();
            return m;
        }

        public List<UnitMeasureDto> GetAllUnitMeasures()
        {
            return UnitMeasureConvertors.ToUnitMeasureDtoList(_context.UnitMeasure.ToList());
        }

        public UnitMeasureDto UpdateUnitMeasures(UnitMeasureDto m)
        {
            UnitMeasure unit= _context.UnitMeasure.FirstOrDefault(p=>p.UnitCode==m.UnitCode);
            unit.UnitName = m.UnitName;
            unit.ConvertionMeasureCode = m.ConvertionMeasureCode;
            unit.ConvertionMeasureAmount = m.ConvertionMeasureAmount;
            _context.SaveChanges();
            return m;
        }
    }
}
