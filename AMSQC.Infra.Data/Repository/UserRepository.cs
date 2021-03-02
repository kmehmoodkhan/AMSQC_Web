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
            user.CreatedOn = DateTime.Now;
            _context.UserInfo.Add(user);
            int result = _context.SaveChanges();
            return result;
        }

        public int AddUsers(List<UserInfo> users)
        {
            List<UserInfo> missingUsers = new List<UserInfo>();

            foreach(var u in users)
            {
                var temp = _context.UserInfo.Where(t => t.UserGuid == u.UserGuid).FirstOrDefault();
                if (temp == null)
                {
                    missingUsers.Add(u);
                }
            }


            missingUsers.ForEach(t => t.CreatedOn = DateTime.Now);
            _context.AddRange(missingUsers);
            int result = _context.SaveChanges();
            return result;
        }

        public UserInfo GetUser(Guid userGuid)
        {
            var user=  _context.UserInfo.Where(u => u.UserGuid == userGuid).FirstOrDefault();
            return user;
        }

        public List<UserInfo> GetUsers(int regionId)
        {
            var users = _context.UserInfo.Where(u => u.RegionId == regionId);
            return users.ToList();
        }
    }
}
