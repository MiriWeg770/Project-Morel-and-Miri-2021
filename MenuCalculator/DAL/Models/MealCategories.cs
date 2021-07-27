using System;
using System.Collections.Generic;

namespace DAL.Models
{
    public partial class MealCategories
    {
        public MealCategories()
        {
            CategoriesToMeal = new HashSet<CategoriesToMeal>();
        }

        public int MealCategoriesCode { get; set; }
        public string MealCategoriesName { get; set; }

        public virtual ICollection<CategoriesToMeal> CategoriesToMeal { get; set; }
    }
}
