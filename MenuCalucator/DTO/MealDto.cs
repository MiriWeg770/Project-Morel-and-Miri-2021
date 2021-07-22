using System;
using System.Collections.Generic;
using System.Text;

namespace DTO
{
   public class MealDto
    {
        public int MealCode { get; set; }
        public string MealName { get; set; }
        public string Instructions { get; set; }
        public int? NumberOfDiners { get; set; }
        public string Discription { get; set; }
        public int? MealCategoryCode { get; set; }
        public int? UserCode { get; set; }
        public int? NumberOfViews { get; set; }
        public String UserName { get; set; }
    }
}
