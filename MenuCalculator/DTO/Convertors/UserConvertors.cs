using DAL.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace DTO.Convertors
{
   public class UserConvertors
    {        
        public static Users ToUser(UserDto u)
        {
            return new Users()
            {
                Mail = u.Mail,
                Password = u.Password,
                UserCode = u.UserCode,
                UserName = u.UserName,
                PictureCode=u.PictureCode,
                Manager=u.Manager      
            };

        }
        public static UserDto ToUserDto(Users u)
        {
            return new UserDto()
            {
                Mail = u.Mail,
                Password = u.Password,
                UserCode = u.UserCode,
                UserName = u.UserName,
                PictureCode = u.PictureCode,
                Manager = u.Manager            
            };
        }


        public static List<UserDto> ToUserDtoList(List<Users> uList)
        {
            List<UserDto> udList = new List<UserDto>();
            foreach (var item in uList)
            {
                udList.Add(ToUserDto(item));
            }
            return udList;
        }
        public static List<Users> ToUserList(List<UserDto> uList)
        {
            List<Users> udList = new List<Users>();
            foreach (var item in uList)
            {
                udList.Add(ToUser(item));
            }
            return udList;
        }


    }

}
