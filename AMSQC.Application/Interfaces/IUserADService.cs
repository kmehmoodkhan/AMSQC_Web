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
        //public Task<List<UserInfo>> GetUsers(int regionId);

        //public Task<string> GetRegion(string token);

        List<UserInfo> GetUsers(int regionId);

        Task<string> GetRegion(string token);
    }
}
