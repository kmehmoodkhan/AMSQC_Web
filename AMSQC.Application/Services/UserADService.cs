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
        public UserADService(ITokenAcquisition tokenAcquisition, GraphServiceClient graphServiceClient, IOptions<MicrosoftGraphOptions> graphOptions)
        {
            _tokenAcquisition = tokenAcquisition;
            _graphServiceClient = graphServiceClient;
            _graphOptions = graphOptions;
        }

        private readonly ITokenAcquisition _tokenAcquisition;
        private readonly GraphServiceClient _graphServiceClient;
        private readonly IOptions<MicrosoftGraphOptions> _graphOptions;

        public UserInfo GetUserProfile()
        {
            User user = _graphServiceClient.Me.Request().GetAsync().GetAwaiter().GetResult();

            UserInfo userInfo = new UserInfo();
            userInfo.UserName = user.UserPrincipalName;
            userInfo.UserGuid = user.EmployeeId;
            userInfo.Region = user.OfficeLocation;
            return userInfo;
        }

        public List<UserInfo> GetUsers(int regionId)
        {
            User currentUser = _graphServiceClient.Me.Request().GetAsync().GetAwaiter().GetResult();
            var usersList = _graphServiceClient.Users.Request().Top(999).GetAsync().GetAwaiter().GetResult();

            var usersList1 = usersList.Where(t => t.OfficeLocation == currentUser.OfficeLocation)
                    .Select(usr => new UserInfo {
                        UserGuid = usr.Id,
                        UserName = usr.DisplayName
                    }).ToList();

            return usersList1;
        }

   
    }
}
