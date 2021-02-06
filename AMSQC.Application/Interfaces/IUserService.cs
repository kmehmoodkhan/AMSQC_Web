using AMSQC.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AMSQC.Application.Interfaces
{
    public interface IUserService
    {
        int AddUser(UserInfo user);

        UserInfo GetUser(string userGuid);
    }
}
