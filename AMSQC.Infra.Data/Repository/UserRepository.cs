using AMSQC.Domain.Models;
using AMSQC.Domain.Repository;
using AMSQC.Infra.Data.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AMSQC.Infra.Data.Repository
{
    public class UserRepository : IUserRepository
    {
        public AmsqcDbContext _context;

        public UserRepository(AmsqcDbContext context)
        {
            _context = context;
        }
        public int AddUser(UserInfo user)
        {
            _context.UserInfo.Add(user);
            int result = _context.SaveChanges();
            return result;
        }

        public UserInfo GetUser(string userGuid)
        {
            UserInfo user= _context.UserInfo.Where(u => u.UserGuid == userGuid).FirstOrDefault();
            return user;
        }
    }
}
