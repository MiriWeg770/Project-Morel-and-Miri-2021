using DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace DTO.Convertors
{
    public class ProductConvertors
    {

        public static MealProducts ToProduct(ProductDto u)
        {
            return new MealProducts()
            {
                MealProductName=u.ProductName,
                AmountInMeal=u.Amount,
                MealProductCompany=u.Company,
            };

        }
        public static ProductDto ToProductDto(MealProducts u)
        {
            return new ProductDto()
            {
             ProductName=u.MealProductName,
             Amount=(int)u.AmountInMeal,
             Company=u.MealProductCompany,
             
             

            };
        }

        public static List<ProductDto> ToProductDtoList(List<MealProducts> pList)
        {
            List<ProductDto> pdList = new List<ProductDto>();
            foreach (var item in pList)
            {
                pdList.Add(ToProductDto(item));
            }
            return pdList;
        }
        public static List<MealProducts> ToProductList(List<ProductDto> pList)
        {
            List<MealProducts> pdList = new List<MealProducts>();
            foreach (var item in pList)
            {
                pdList.Add(ToProduct(item));
            }
            return pdList;
        }

      
    }
}

