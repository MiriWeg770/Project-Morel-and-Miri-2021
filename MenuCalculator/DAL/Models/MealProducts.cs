using System;
using System.Collections.Generic;

namespace DAL.Models
{
    public partial class MealProducts
    {
        public int MealProductCode { get; set; }
        public string MealProductName { get; set; }
        public int? UnitMeasureCode { get; set; }
        public double? AmountInMeal { get; set; }
        public int? MealCode { get; set; }

        public virtual Meal MealCodeNavigation { get; set; }
        public virtual UnitMeasure UnitMeasureCodeNavigation { get; set; }
    
    }
}
