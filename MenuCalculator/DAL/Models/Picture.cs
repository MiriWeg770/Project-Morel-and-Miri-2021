using System;
using System.Collections.Generic;

#nullable disable

namespace DAL.Models
{
    public partial class Picture
    {
        public Picture()
        {
            Meals = new HashSet<Meal>();
            Menus = new HashSet<Menu>();
            Users = new HashSet<Users>();
        }

        public int PictureCode { get; set; }
        public string PictureName { get; set; }
        public byte[] Picture1 { get; set; }

        public virtual ICollection<Meal> Meals { get; set; }
        public virtual ICollection<Menu> Menus { get; set; }
        public virtual ICollection<Users> Users { get; set; }
    }
}
