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
        public TimeSpan? PreparationTime { get; set; }
        public DateTime? DateUplaod { get; set; }
        public DateTime? DateCreated { get; set; }
        public bool? Publish { get; set; }
        public DateTime? DateUpdated { get; set; }
        public int? MenuCode { get; set; }
        public int? PictureCode { get; set; }
        public int? LevelCode { get; set; }

        public List<ProductDto> Products { get; set; }
        public String UserName { get; set; }
    }
}
