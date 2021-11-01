using System;
using System.Collections.Generic;
using System.Text;

namespace DTO
{
   public  class ProductDto
    {
        public int ProductCode { get; set; }
        public string ProductName { get; set; }
        public string Company { get; set; }
        public int? UnitMeasureCode { get; set; }
        public int? AmountInMeal { get; set; }
        public int? MealCode { get; set; }

   
    }
}
