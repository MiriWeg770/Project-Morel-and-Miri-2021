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
        public virtual Users UserCodeNavigation { get; set; }

        public virtual ICollection<CategoriesToMeal> CategoriesToMeal { get; set; }
        public virtual ICollection<MealProducts> MealProducts { get; set; }
    }
}
