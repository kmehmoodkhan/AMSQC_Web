﻿using AMSQC.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AMSQC.Application.Interfaces
{
    public interface IUserService
    {
        UserInfo AddUser(UserInfo user);

        UserInfo GetUser(Guid userGuid);

        List<UserInfo> GetUsers(int regionId);

        int AddUsers(List<UserInfo> users);
    }
}
