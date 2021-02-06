using AMSQC.Application.Interfaces;
using AMSQC.Domain.Models;
using AMSQC.Domain.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AMSQC.Application.Services
{
    public class UserService : IUserService
    {
        IUserRepository _userRepository = null;

        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }
        public int AddUser(UserInfo user)
        {
            var userInfo = _userRepository.GetUser(user.UserGuid);
            if (userInfo == null)
            {
                return _userRepository.AddUser(user);
            }
            return userInfo.UserId;
        }

        public UserInfo GetUser(string userGuid)
        {
            var result = _userRepository.GetUser(userGuid);
            return result;
        }
    }
}
