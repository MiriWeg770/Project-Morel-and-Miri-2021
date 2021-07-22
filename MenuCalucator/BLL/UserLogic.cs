using DAL.Models;
using DTO.Convertors;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace BLL
{
    public class UserLogic : IUserLogic
    {
        private MenuCalculatorContext _context;
        public UserLogic(MenuCalculatorContext context)
        {
            _context = context;
        }
        public UserDto AddUser(UserDto u)
        {
            try
            {
                Users m = UserConvertors.ToUser(u);
                Users m1 = new Users() { UserName = u.UserName, Mail = u.Mail, Password = u.Password };
                _context.Users.Add(m1);
                _context.SaveChanges();
                return UserConvertors.ToUserDto(m);
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public UserDto DeletUser(UserDto u)
        {
            _context.Users.Remove(UserConvertors.ToUser(u));
            _context.SaveChanges();
            return u;
        }

        public List<UserDto> GetAllUsers()
        {
            return UserConvertors.ToUserDtoList(_context.Users.ToList());
        }

        public UserDto GetUserById(int id)
        {
            try
            {
                return UserConvertors.ToUserDto(_context.Users.FirstOrDefault(p => p.UserCode == id));
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public UserDto GetUserByName(string name)
        {
            try
            {
                return UserConvertors.ToUserDto(_context.Users.FirstOrDefault(p => p.UserName == name));
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public bool IsExists(UserDto b)
        {
            return _context.Users.Any(p => p.UserName == b.UserName);
        }

        public UserDto SignIn(string Name, string password)
        { 
            var t = _context.Users.FirstOrDefault(o => o.UserName == Name && o.Password == password);
            return UserConvertors.ToUserDto(t);
        }

    
        public UserDto SignUp(string Name, string Mail, string Password)
        {
            UserDto u = new UserDto();
            u.UserName = Name;
            u.Mail = Mail;
            u.Password = Password;
            _context.Users.Add(UserConvertors.ToUser(u));
            _context.SaveChanges();
            return u;
        }
        public UserDto UpdateUser(UserDto u)
        {
            Users U = _context.Users.FirstOrDefault(w => w.UserCode == u.UserCode);
            if (u == null)
                return null;
            U.Mail = u.Mail;
            U.Password = u.Password;
            U.UserName = u.UserName;
            _context.SaveChanges();
            
            return UserConvertors.ToUserDto(U);
            
        }

       //public UserDto addUserMeal(DTO.MealDto m)
       // {
            
       // }



    }
}
