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
          
            _context.Users.FirstOrDefault(p => p.UserCode == u.UserCode).Meal.Add(MealConvertors.ToMeal(u));        
            _context.SaveChanges();
            return u;
        }


        public MealDto DeletMeal(MealDto u)
        {
            Meal m = _context.Meal.FirstOrDefault(p => p.UserCode == u.UserCode && p.MealName==u.MealName);
           _context.MealProducts.RemoveRange( _context.MealProducts.Where(p => p.MealCode == u.MealCode));
           _context.Meal.Remove(m);
            _context.SaveChanges();
            return u;
        }

        public List<MealDto> GetAllMeals()
        {
            return MealConvertors.ToMealDtoList(_context.Meal.Where(p=>p.Publish==true).ToList());
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
         return MealConvertors.ToMealDtoList(_context.Meal.Where(p => p.UserCode == id).ToList());
           
        }

        public bool IsExists(MealDto b)   
        {
            if (_context.Meal.Any(p =>p.UserCode == b.UserCode && p.MealName == b.MealName))
                return true;
            return false;
        }

        public void SendMealInMail( string to, string from, string meal)
        {
            MailMessage mail = new MailMessage();
            mail.To.Add(to);
            mail.From = new MailAddress("MenuCalculatorWeb@gmail.com");
            mail.IsBodyHtml = true;
            mail.Body = "<h3> "+from+" שלח לך מתכון</h3>";
            mail.Subject = "מתכון חדש";

            var pdfBinary = Convert.FromBase64String(meal); //here's the error            
            mail.Attachments.Add(new Attachment(new MemoryStream(pdfBinary), "iTextSharpPDF.pdf"));

            //using (var fs = new FileStream("Zz", FileMode.Create))
            //using (var writer = new BinaryWriter(fs))
            //{
            //    writer.Write(pdfBinary, 0, pdfBinary.Length);
            //    writer.Close();

            //}

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
            U.PreparationTime = u.PreparationTime;
            U.MenuCode = u.MenuCode;
            U.DateCreated = u.DateCreated;
            U.DateUpdated = u.DateUpdated;
            U.DateUplaod = u.DateUplaod;
            U.LevelCode = u.LevelCode;
            U.PictureCode = u.PictureCode;
            U.MealProducts = ProductConvertors.ToProductList(u.Products);


            //foreach (var item in u.Products)
            //{
            //    if (_context.MealProducts.FirstOrDefault(p => p.MealProductCode != item.ProductCode) == null)
            //        _context.MealProducts.Add(ProductConvertors.ToProduct(item));

            //}


            _context.RemoveRange(_context.MealProducts.Where(p => p.MealCode == U.MealCode));
            _context.SaveChanges();
            return MealConvertors.ToMealDto(U);
        }


    }
}
