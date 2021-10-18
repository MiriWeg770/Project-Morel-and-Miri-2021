using System;
using System.Collections.Generic;

namespace DAL.Models
{
    public partial class Meal
    {
        public Meal()
        {
            CategoriesToMeal = new HashSet<CategoriesToMeal>();
            MealProducts = new HashSet<MealProducts>();
        }

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
        public int? PictureCode { get; set; }
        public bool? Publish { get; set; }
        public DateTime? DateUpdated { get; set; }
        public int? MenuCode { get; set; }
        public int? LevelCode { get; set; }

        public virtual Level LevelCodeNavigation { get; set; }
        public virtual Users UserCodeNavigation { get; set; }
        public virtual Picture PictureCodeNavigation { get; set; }
        public virtual Menu MenuCodeNavigation { get; set; }
        public virtual ICollection<CategoriesToMeal> CategoriesToMeal { get; set; }
        public virtual ICollection<MealProducts> MealProducts { get; set; }

       
    }
}
