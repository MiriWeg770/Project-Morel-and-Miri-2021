using System;
using System.Collections.Generic;

namespace DAL.Models
{
    public partial class Users
    {
        public Users()
        {
            Meal = new HashSet<Meal>();
            Menu = new HashSet<Menu>();
        }

        public int UserCode { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public string Mail { get; set; }

        public virtual ICollection<Meal> Meal { get; set; }
        public virtual ICollection<Menu> Menu { get; set; }
    }
}
