using Chilkat;
using DAL.Models;
using DTO;
using DTO.Convertors;
using iTextSharp.text;
using iTextSharp.text.pdf;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Reflection.Metadata;
using System.Text;

namespace BLL
{
   public class MealLogic : IMealLogic
    {
        private MenuCalculatorContext _context;

        public MealLogic(MenuCalculatorContext context)
        {
            _context = context;
        }
      

        public MealDto AddMeal(MealDto u)
        {
            try
            {
                Meal m = MealConvertors.ToMeal(u);
                //_context.Meal.Add(m);
                 AddMealToUser(u);       
                _context.SaveChanges();

                return MealConvertors.ToMealDto(m);
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public MealDto AddMealToUser(MealDto u)
        {
         
                if (u.PreparationTime.Value.Hour == 23)
                    u.PreparationTime = new DateTime(2000, 2, 12, 1, u.PreparationTime.Value.Minute, 0);
            else if (u.PreparationTime.Value.Hour == 22)
                    u.PreparationTime = new DateTime(2000, 2, 12, 0, u.PreparationTime.Value.Minute, 0);

            _context.Users.FirstOrDefault(p => p.UserCode == u.UserCode).Meal.Add(MealConvertors.ToMeal(u));
                _context.SaveChanges();
                return u;
            
         
        }

        public MealDto checkMealName(MealDto u)
        {
            List<Meal> l= _context.Meal.Where(m => m.UserCode == u.UserCode && m.MealName == u.MealName && m.MenuCode==null).ToList();
            if (l.Count>1)
                return MealConvertors.ToMealDto(l[0]);
            else
                return null;
        }

        public MealDto DeletMeal(MealDto u)
        {
            Meal m = _context.Meal.FirstOrDefault(p => p.UserCode == u.UserCode && p.MealName==u.MealName);
            List<MealProducts> p = _context.MealProducts.Where(p => p.MealCode == m.MealCode).ToList();
            _context.MealProducts.RemoveRange(p);
            _context.Meal.Remove(m);   
            _context.SaveChanges();
            return u;
        }

        public MealDto DeletMenuMeal(MealDto u)
        {
            Meal m = _context.Meal.FirstOrDefault(p => p.UserCode == u.UserCode && p.MealName == u.MealName && p.MenuCode==u.MenuCode);
            _context.Meal.Remove(m);
            _context.SaveChanges();
            return u;
        }

        public List<MealDto> GetAllMeals()
        {
            return MealConvertors.ToMealDtoList(_context.Meal.Where(p=>p.Publish==true).ToList());
        }

        public List<MealDto> GetAllUsersMeals()
        {
            return MealConvertors.ToMealDtoList(_context.Meal.ToList());
        }

        public List<ProductDto> GetAllUsersMealsProducts()
        {
            return ProductConvertors.ToProductDtoList(_context.MealProducts.ToList());
        }

        public MealDto GetMealById(int id)
        {
            try
            {
                return MealConvertors.ToMealDto(_context.Meal.FirstOrDefault(p => p.MealCode == id));
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public List<ProductDto> GetMealProducts(int id)
        {
            try
            {
                return ProductConvertors.ToProductDtoList(_context.MealProducts.Where(p=>p.MealCode == id).ToList());
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public List<MealDto> GetUserMeals(int id)
        {
             return MealConvertors.ToMealDtoList(_context.Meal.Where(p => p.UserCode == id && p.MenuCode==null).ToList());         
        }

        public bool IsExists(MealDto b)   
        {
            if (_context.Meal.Any(p =>p.UserCode == b.UserCode && p.MealName == b.MealName))
                return true;
            return false;
        }

        public void SendMealInMail(string to, string from, string meal)
        {
            MailMessage mail = new MailMessage();
            mail.To.Add(to);
            mail.From = new MailAddress("MenuCalculatorWeb@gmail.com");
            mail.IsBodyHtml = true;
            mail.Body = "<h3> " + from + " שלח לך מתכון</h3>";
            mail.Subject = "מתכון חדש";

            var pdfBinary = Convert.FromBase64String(meal);
            mail.Attachments.Add(new Attachment(new MemoryStream(pdfBinary), "מתכון.pdf"));

            SmtpClient s = new SmtpClient("smtp.gmail.com");
            s.EnableSsl = true;
            s.Port = 587;
            s.DeliveryMethod = SmtpDeliveryMethod.Network;
            s.Credentials = new NetworkCredential("MenuCalculatorWeb@gmail.com", "Mc2021@Mc");
            s.Send(mail);
        }

        public MealDto UpdateMeal(MealDto u)
        {
            Meal U = _context.Meal.FirstOrDefault(w => w.MealCode == u.MealCode);

            if (U == null)
                return null;

            U.MealName = u.MealName;
            U.NumberOfDiners = u.NumberOfDiners;
            U.NumberOfViews = u.NumberOfViews;
            U.UserCode = u.UserCode;
            U.Discription = u.Discription;
            U.Instructions = u.Instructions;
            U.MealCategoryCode = u.MealCategoryCode;
            U.Publish = u.Publish;
            if (u.PreparationTime.Value.Hour != U.PreparationTime.Value.Hours
                && u.PreparationTime.Value.Minute != U.PreparationTime.Value.Minutes)
            {
                if (u.PreparationTime.Value.Hour == 23)
                    U.PreparationTime = new TimeSpan(1, u.PreparationTime.Value.Minute, 0);
                else if (u.PreparationTime.Value.Hour == 22)
                    U.PreparationTime = new TimeSpan(0, u.PreparationTime.Value.Minute, 0);
                else
                    U.PreparationTime = new TimeSpan(u.PreparationTime.Value.Hour + 2, u.PreparationTime.Value.Minute, 0);
            }
            U.MenuCode = u.MenuCode;
            U.DateCreated = u.DateCreated;
            U.DateUpdated = u.DateUpdated;
            U.DateUplaod = u.DateUplaod;
            U.LevelCode = u.LevelCode;
            U.PictureCode = u.PictureCode;
            U.MealProducts = ProductConvertors.ToProductList(u.Products);

            _context.RemoveRange(_context.MealProducts.Where(p => p.MealCode == U.MealCode));
            _context.SaveChanges();
            return MealConvertors.ToMealDto(U);
        }

        public MealDto ChangeViewsNumber(MealDto u)
        {
            Meal m = _context.Meal.FirstOrDefault(p => p.MealCode == u.MealCode);
            m.NumberOfViews += 1;
            _context.SaveChanges();
            return MealConvertors.ToMealDto(m);
        }
    }
}
