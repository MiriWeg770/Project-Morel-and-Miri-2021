using DTO;
using System;
using System.Collections.Generic;
using System.Text;

namespace BLL
{
    public interface IUnitMeasureLogic
    {
        List<UnitMeasureDto> GetAllUnitMeasures();
    }
}
