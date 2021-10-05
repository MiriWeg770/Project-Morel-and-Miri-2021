using System;
using System.Collections.Generic;
using System.Text;

namespace DTO
{
   public  class ProductDto
    {
        public int ProductCode { get; set; }
        public string ProductName { get; set; }
        public int Amount { get; set; }
        public string AmountName { get; set; }
        public string Company { get; set; }
    }
}
