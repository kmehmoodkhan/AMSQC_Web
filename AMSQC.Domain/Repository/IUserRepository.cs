﻿using AMSQC.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AMSQC.Domain.Repository
{
    public interface IUserRepository
    {
        int AddUser(UserInfo user);

        UserInfo GetUser(Guid userGuid);

        List<UserInfo> GetUsers(int regionId);

        Task<int> AddUsers(List<UserInfo> users);

        Task<int> DeleteUsers(int regionId);
    }
}
