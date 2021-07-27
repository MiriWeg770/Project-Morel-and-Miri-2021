using System;
using System.Collections.Generic;
using System.Text;

namespace DTO.Convertors
{
    public class MenuDto
    {
        public int MenuCode { get; set; }
        public string MenuName { get; set; }
        public string Discription { get; set; }
        public int? UserCode { get; set; }
        public DateTime? DateCreated { get; set; }
        public DateTime? DateUpdated { get; set; }
        public string Links { get; set; }
        public int? ViewsNumber { get; set; }
        public  string UserName { get; set; }
    }
}
