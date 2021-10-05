using System;
using System.Collections.Generic;

#nullable disable

namespace DAL.Models
{
    public partial class Level
    {
        public Level()
        {
            Meals = new HashSet<Meal>();
            Menus = new HashSet<Menu>();
        }

        public int LevelCode { get; set; }
        public string LevelName { get; set; }

        public virtual ICollection<Meal> Meals { get; set; }
        public virtual ICollection<Menu> Menus { get; set; }
    }
}
