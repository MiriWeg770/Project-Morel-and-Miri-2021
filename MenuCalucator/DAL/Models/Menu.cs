using System;
using System.Collections.Generic;

namespace DAL.Models
{
    public partial class Menu
    {
        public Menu()
        {
            CategoriesToMenu = new HashSet<CategoriesToMenu>();
        }

        public int MenuCode { get; set; }
        public string MenuName { get; set; }
        public string Discription { get; set; }
        public int? UserCode { get; set; }
        public DateTime? DateCreated { get; set; }
        public DateTime? DateUpdated { get; set; }
        public string Links { get; set; }
        public int? ViewsNumber { get; set; }

        public virtual Users User { get; set; }
        public virtual ICollection<CategoriesToMenu> CategoriesToMenu { get; set; }
    }
}
