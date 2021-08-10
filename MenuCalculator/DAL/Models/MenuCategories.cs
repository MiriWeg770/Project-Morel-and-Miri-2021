using System;
using System.Collections.Generic;

namespace DAL.Models
{
    public partial class MenuCategories
    {
        public MenuCategories()
        {
            CategoriesToMenu = new HashSet<CategoriesToMenu>();
        }

        public int MenuCategoriesCode { get; set; }
        public string MenuCategoriesName { get; set; }

        public virtual ICollection<CategoriesToMenu> CategoriesToMenu { get; set; }
    }
}
