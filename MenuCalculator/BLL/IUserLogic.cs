using DAL.Models;
using DTO.Convertors;
using System;
using System.Collections.Generic;
using System.Text;

namespace BLL
{
    public interface IUserLogic
    {
        List<UserDto> GetAllUsers();
        UserDto GetUserById(int id);
        UserDto GetUserByName(string name);
        UserDto AddUser(UserDto u);
        string ResetPassword(string m);
        string SendMessage(string m,string s, string u);
        UserDto DeletUser(UserDto u);
        UserDto UpdateUser(UserDto u);
        UserDto  SignIn(string Name, string password);
        UserDto SignUp(string Name, string Mail,string Password,bool manager);
        bool IsExists(UserDto b);
        bool IsManager(UserDto b);
    }
}
