using AMSQC.Application.Interfaces;
using AMSQC.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AMSQC.Application.Services
{
    public class UserADService : IUserADService
    {
        public List<UserInfo> GetUsers(int regionId)
        {
            List<UserInfo> users = new List<UserInfo>();
            users.Add(new UserInfo() { UserGuid = "12344", UserName = "John Martin" });
            users.Add(new UserInfo() { UserGuid = "56633", UserName = "Maria Zegara" });
            return users;
        }
    }
}
