using AMSQC.Application.Interfaces;
using AMSQC.Domain.Models;
using AMSQC.Infra.Data.Context;
using Microsoft.Extensions.Options;
using Microsoft.Graph;
using Microsoft.Identity.Client;
using Microsoft.Identity.Web;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AMSQC.Application.Services
{
    public class UserADService : IUserADService
    {
        IUserService _userService = null;
        IRegionService _regionService = null;
        public UserADService(GraphServiceClient graphServiceClient, IUserService userService, IRegionService regionService)
        {
            _graphServiceClient = graphServiceClient;
            _userService = userService;
            _regionService = regionService;
        }

        private readonly GraphServiceClient _graphServiceClient;

        public UserInfo GetUserProfile()
        {
            User user = _graphServiceClient.Me.Request().GetAsync().GetAwaiter().GetResult();

            UserInfo userInfo = new UserInfo();
            userInfo.UserName = user.UserPrincipalName;
            userInfo.UserGuid =Guid.Parse(user.Id);
            userInfo.Region = user.OfficeLocation;
            userInfo.FullName = user.DisplayName;

            if (!string.IsNullOrEmpty(user.OfficeLocation)) {
                var regionTemp = _regionService.GetRegion(user.OfficeLocation);
                if(regionTemp != null)
                {
                    userInfo.RegionId = regionTemp.RegionId;
                }
             }


            _userService.AddUser(userInfo);

            return userInfo;
        }

        public List<UserInfo> GetUsers(int regionId)
        {
            User currentUser = null;
            try
            {
                currentUser = _graphServiceClient.Me.Request().GetAsync().GetAwaiter().GetResult();
            }
            catch(Exception ex)
            {
                ;
            }


            List<UserInfo> usersList1 = null;
            IGraphServiceUsersCollectionPage usersList = null;
            try
            {
                usersList = _graphServiceClient.Users.Request().Top(999).GetAsync().GetAwaiter().GetResult();
                usersList1 = usersList.Where(t => t.OfficeLocation == currentUser.OfficeLocation)
                   .Select(usr => new UserInfo
                   {
                       UserGuid = Guid.Parse(usr.Id),
                       UserName = usr.DisplayName,
                       FullName = usr.DisplayName,
                       Region = usr.OfficeLocation,
                       RegionId = regionId
                   }).ToList();

                _userService.AddUsers(usersList1);
            }
            catch (Exception ex)
            {
                ;
            }


            usersList1 = _userService.GetUsers(regionId);
            return usersList1;
        }

   
    }
}
