using System;
using System.Collections.Generic;
using System.Text;

namespace DTO
{
    public class UnitMeasureDto
    {
        public int UnitCode { get; set; }
        public string UnitName { get; set; }
        public int? ConvertionMeasureCode { get; set; }
        public string ConvertionMeasureAmount { get; set; }
    }
}
