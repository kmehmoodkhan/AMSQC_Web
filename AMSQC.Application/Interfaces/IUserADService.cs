using AMSQC.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AMSQC.Application.Interfaces
{
    public interface IUserADService
    {
        Task<List<UserInfo>> GetUsers(int regionId);
        Task<UserInfo> GetUserProfile();
    }
}
