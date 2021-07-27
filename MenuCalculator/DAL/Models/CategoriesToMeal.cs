using System;
using System.Collections.Generic;

namespace DAL.Models
{
    public partial class CategoriesToMeal
    {
        public int CategoriesToMealCode { get; set; }
        public int? MealCode { get; set; }
        public int? MealCategoriesCode { get; set; }

        public virtual MealCategories MealCategoriesCodeNavigation { get; set; }
        public virtual Meal MealCodeNavigation { get; set; }
    }
}
