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
        public UserInfo AddUser(UserInfo user)
        {
            var userInfo = _userRepository.GetUser(user.UserGuid);
            if (userInfo == null)
            {
                var result= _userRepository.AddUser(user);
                userInfo = _userRepository.GetUser(user.UserGuid);
            }
            return userInfo;
        }

        public UserInfo GetUser(Guid userGuid)
        {
            var result = _userRepository.GetUser(userGuid);
            return result;
        }

        public List<UserInfo> GetUsers(int regionId)
        {
            var result = _userRepository.GetUsers(regionId);
            return result;
        }

        public async Task<int> AddUsers(List<UserInfo> users)
        {
            var result =await _userRepository.AddUsers(users);
            return result;
        }

        public async Task<int> DeleteUsers(int regionId)
        {
            var result = await _userRepository.DeleteUsers(regionId);
            return result;
        }

    }
}
