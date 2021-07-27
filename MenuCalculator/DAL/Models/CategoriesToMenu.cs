using System;
using System.Collections.Generic;

namespace DAL.Models
{
    public partial class CategoriesToMenu
    {
        public int CategoriesToMenuCode { get; set; }
        public int? MenuCode { get; set; }
        public int? MenuCategoriesCode { get; set; }

        public virtual MenuCategories MenuCategoriesCodeNavigation { get; set; }
        public virtual Menu MenuCodeNavigation { get; set; }
    }
}
