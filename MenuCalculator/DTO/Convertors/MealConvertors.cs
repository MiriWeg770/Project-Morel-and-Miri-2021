﻿using DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace DTO.Convertors
{
    public class MealConvertors
    {
        public static Meal ToMeal(MealDto m)
        {
            return new Meal()
            {
                Discription = m.Discription,
                Instructions = m.Instructions,
                MealCategoryCode = m.MealCategoryCode,
                MealCode = m.MealCode,
                MealName = m.MealName,
                NumberOfDiners = m.NumberOfDiners,
                NumberOfViews = m.NumberOfViews,
                UserCode = m.UserCode,
                DateCreated=m.DateCreated,
                DateUpdated=m.DateUpdated,
                DateUplaod=m.DateUplaod,
                MenuCode=m.MenuCode,
                Publish=m.Publish,
                PictureCode=m.PictureCode,
                PreparationTime=m.PreparationTime,
                LevelCode=m.LevelCode,
                MealProducts = ProductConvertors.ToProductList(m.Products)
                
            };
            

        }
        public static MealDto ToMealDto(Meal m)
        {
            return new MealDto()
            {
                Discription = m.Discription,
                Instructions = m.Instructions,
                MealCategoryCode = m.MealCategoryCode,
                MealCode = m.MealCode,
                MealName = m.MealName,
                NumberOfDiners = m.NumberOfDiners,
                NumberOfViews = m.NumberOfViews,
                UserCode = m.UserCode,
                Publish=m.Publish,
                DateUplaod=m.DateUplaod,
                DateUpdated=m.DateUpdated,
                DateCreated=m.DateCreated,
                MenuCode=m.MenuCode,
                PreparationTime=m.PreparationTime,
                PictureCode=m.PictureCode,
                LevelCode=m.LevelCode,
                Products=ProductConvertors.ToProductDtoList(m.MealProducts.ToList())
                
            };
        }

        public static List<MealDto> ToMealDtoList(List<Meal> mList)
        {
            List<MealDto> mdList = new List<MealDto>();
            foreach (var item in mList)
            {
                mdList.Add(ToMealDto(item));
            }
            return mdList;
        }
        public static List<Meal> ToMealList(List<MealDto> mList)
        {
            List<Meal> mdList = new List<Meal>();
            foreach (var item in mList)
            {
                mdList.Add(ToMeal(item));
            }
            return mdList;
        }
    }
}
