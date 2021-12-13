using DAL.Models;
using DTO;
using DTO.Convertors;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Text;

namespace BLL
{
    public class MenuLogic : IMenuLogic
    {
        private MenuCalculatorContext _context;
        public MenuLogic(MenuCalculatorContext context)
        {
            _context = context;
        }

        public MenuDto AddMenuToUser(MenuDto u)
        {
            u.PictureCode = u.Meals[0].PictureCode;
            _context.Users.FirstOrDefault(p => p.UserCode == u.UserCode).Menu.Add(MenuConvertors.ToMenu(u));
            _context.SaveChanges();
            return u;
        }

        public MenuDto DeletMenu(MenuDto u)
        {
            Menu m = _context.Menu.FirstOrDefault(p => p.UserCode == u.UserCode && p.MenuName == u.MenuName);
            List<Meal> p = _context.Meal.Where(p => p.MenuCode == m.MenuCode).ToList();
            List<MealProducts> pro = new List<MealProducts>();
            foreach (var item in p)
            {
               pro.AddRange(_context.MealProducts.Where(p => p.MealCode == item.MealCode));
            }
            _context.MealProducts.RemoveRange(pro);
            _context.Meal.RemoveRange(p);
            _context.Menu.Remove(m);
            _context.SaveChanges();
            return u;
        }

        public List<MenuDto> GetAllMenus()
        {
            return MenuConvertors.ToMenuDtoList(_context.Menu.Where(p => p.Publish == true).ToList());
        }

        public List<MenuDto> GetAllMenusByIdUser(int id)
        {
            return MenuConvertors.ToMenuDtoList(_context.Menu.Where(m => m.UserCode == id).ToList());
        }

        public MenuDto GetMenuById(int id)
        {
            try
            {
                return MenuConvertors.ToMenuDto(_context.Menu.FirstOrDefault(p => p.MenuCode == id));
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public MenuDto GetMenuByName(string name)
        {
            try
            {
                return MenuConvertors.ToMenuDto(_context.Menu.FirstOrDefault(p => p.MenuName == name));
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public MenuDto UpdateMenu(MenuDto u)
        {

            Menu U = _context.Menu.FirstOrDefault(w => w.MenuCode == u.MenuCode);
            if (U == null)
                return null;
            U.MenuName = u.MenuName;
            U.UserCode = u.UserCode;
            U.ViewsNumber = u.ViewsNumber;
            U.Discription = u.Discription;
            U.DateUpdated = u.DateUpdated;
            U.DateCreated = u.DateCreated;
            U.LevelCode = u.LevelCode;
            U.DateUpload = u.DateUpload;
            U.Publish = u.Publish;       
            U.PictureCode = u.Meals[0].PictureCode;
            U.MenuCategoryCode = u.MenuCategoryCode;
            U.Meals = MealConvertors.ToMealList(u.Meals);

            List<MealProducts> p = new List<MealProducts>();
            foreach (var item in _context.Meal.Where(m => m.MenuCode == u.MenuCode).ToList())
            {
                foreach (var item1 in _context.MealProducts.Where(p => p.MealCode == item.MealCode))
                {
                    p.Add(item1);
                }
            }
            List<Meal> p1 = _context.Meal.Where(p => p.MenuCode == u.MenuCode).ToList();
            _context.MealProducts.RemoveRange(p);
            _context.Meal.RemoveRange(p1);
            _context.SaveChanges();
            return MenuConvertors.ToMenuDto(U);
        }

        public List<MealDto> GetMenuMeals(int id)
        {
            try
            {
                return MealConvertors.ToMealDtoList(_context.Meal.Where(p => p.MenuCode == id).ToList());
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public bool IsExists(MenuDto b)
        {
            if (_context.Menu.Any(p => p.UserCode == b.UserCode && p.MenuName == b.MenuName))
                return true;
            return false;
        }

        public MenuDto ChangeViewsNumber(MenuDto u)
        {
          Menu m= _context.Menu.FirstOrDefault(p => p.MenuCode == u.MenuCode);
            m.ViewsNumber += 1;
            _context.SaveChanges();
            return MenuConvertors.ToMenuDto(m);
        }

        public List<MenuDto> GetAllUsersMenus()
        {
            return MenuConvertors.ToMenuDtoList(_context.Menu.ToList());
        }

        public MenuDto Publish(MenuDto u)
        {
            Menu m = _context.Menu.FirstOrDefault(p => p.MenuCode == u.MenuCode);
            m.Publish = u.Publish;
            m.DateUpload = u.DateUpload;
            _context.SaveChanges();
            return MenuConvertors.ToMenuDto(m);
        }

        public void SendMenuInMail(string to, string from, string menu)
        {
            MailMessage mail = new MailMessage();
            mail.To.Add(to);
            mail.From = new MailAddress("MenuCalculatorWeb@gmail.com");
            mail.IsBodyHtml = true;
            mail.Body = "<h3> " + from + " שלח לך תפריט</h3>";
            mail.Subject = "תפריט חדש";

            var pdfBinary = Convert.FromBase64String(menu);
            mail.Attachments.Add(new Attachment(new MemoryStream(pdfBinary), "תפריט.pdf"));

            SmtpClient s = new SmtpClient("smtp.gmail.com");
            s.EnableSsl = true;
            s.Port = 587;
            s.DeliveryMethod = SmtpDeliveryMethod.Network;
            s.Credentials = new NetworkCredential("MenuCalculatorWeb@gmail.com", "Mc2021@Mc");
            s.Send(mail);

        }

        public List<ProductDto> GetMenuProducts(int id)
        {

            List<MealProducts> pro = new List<MealProducts>();
            List<MealProducts> p = new List<MealProducts>();
            List<Meal> m = _context.Meal.Where(p => p.MenuCode == id).ToList();
            foreach (var item in m)
            {
                foreach (var item2 in _context.MealProducts.Where(p => p.MealCode == item.MealCode))
                {
                    item2.AmountInMeal /= item.NumberOfDiners;
                    p.Add(item2);
                }         
            }
            for (int i = 0; i < p.Count; i++)
            {
                for (int j = i+1; j < p.Count; j++)
                {
                    if (p[i].MealProductName == p[j].MealProductName)
                    {
                        if (p[i].UnitMeasureCode == p[j].UnitMeasureCode)
                        {
                            p[i].AmountInMeal += p[j].AmountInMeal;
                            pro.Add(p[i]);
                        }
                        else
                        {
                            pro.Add(p[i]);
                        }
                    }                   
                }
            }
            bool flag;
            foreach (var item in p)
            { flag = false;
                foreach (var item2 in pro)
                {                
                    if (item.MealProductName==item2.MealProductName && item.UnitMeasureCode==item2.UnitMeasureCode)
                    {
                        flag = true;
                        break;
                    }
                    //if (!pro.Contains(item))
                    //{
                    //    flag = false;
                    //    break;
                    //}
                }
                if (!flag)
                {
                    pro.Add(item);
                }           
            }
            return ProductConvertors.ToProductDtoList(pro);
        }
    }
}
