using System;
using System.Collections.Generic;

namespace DAL.Models
{
    public partial class UnitMeasure
    {
        public UnitMeasure()
        {
            MealProducts = new HashSet<MealProducts>();
        }

        public int UnitCode { get; set; }
        public string UnitName { get; set; }
        public int? ConvertionMeasureCode { get; set; }
        public string ConvertionMeasureAmount { get; set; }

        public virtual ICollection<MealProducts> MealProducts { get; set; }
    }
}
