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

        public async Task<UserInfo> GetUserProfile()
        {
            User user = await _graphServiceClient.Me.Request().GetAsync();

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

            var groups = await _graphServiceClient.Me.TransitiveMemberOf
                .Request()
                .GetAsync();

            ////((Microsoft.Graph.Group)groups.CurrentPage[6]).DisplayName
            var groupNames = groups.CurrentPage.Select(t => (t as Microsoft.Graph.Group).DisplayName).ToArray();

            userInfo.ReportAccessLevel = GetReportAccessLevel(groupNames);

            _userService.AddUser(userInfo);

            return userInfo;
        }

        public async Task<List<UserInfo>> GetUsers(int regionId)
        {
            User currentUser = null;
            try
            {
                currentUser =await _graphServiceClient.Me.Request().GetAsync();
            }
            catch(Exception ex)
            {
                string exception = ex.Message;
                ;
            }


            List<UserInfo> usersList1 = null;
            //IGraphServiceUsersCollectionPage usersList = null;
            //try
            //{
            //    usersList = _graphServiceClient.Users.Request().Top(999).GetAsync().GetAwaiter().GetResult();
            //    usersList1 = usersList.Where(t => t.OfficeLocation == currentUser.OfficeLocation)
            //       .Select(usr => new UserInfo
            //       {
            //           UserGuid = Guid.Parse(usr.Id),
            //           UserName = usr.DisplayName,
            //           FullName = usr.DisplayName,
            //           Region = usr.OfficeLocation,
            //           RegionId = regionId
            //       }).ToList();

            //    //var r1= await _userService.DeleteUsers(regionId);
            //    await _userService.AddUsers(usersList1);
            //}
            //catch (Exception ex)
            //{
            //    string exception = ex.Message;
            //}


            usersList1 = _userService.GetUsers(regionId);
            return usersList1;
        }

        public ReportAccessLevel[] GetReportAccessLevel(string[] groups)
        {
            List<ReportAccessLevel> reportAccessLevel = new List<ReportAccessLevel>();

            var auditorRoleCount = groups.Where(t => t.ToLower() == "SG-QCAPP-AUDITOR".ToLower()).Count();

            if (auditorRoleCount > 0)
            {
                reportAccessLevel.Add(ReportAccessLevel.Auditor);
            }

            var cmRoleCount = groups.Where(t => t.ToLower() == "SG-QCApp-Reporting-CM".ToLower()).Count();

            if (cmRoleCount > 0)
            {
                reportAccessLevel.Add(ReportAccessLevel.CM);
            }

            var centerManagerRole = groups.Where(t => t.ToLower() == "SG-QCAPP-CENTREMANAGERS".ToLower()).Count();

            if (centerManagerRole > 0)
            {
                reportAccessLevel.Add(ReportAccessLevel.CenterManager);
            }

            var operationsRoleCount = groups.Where(t => t.ToLower() == "SG-QCApp-Reporting-OPS".ToLower()).Count();

            if (operationsRoleCount > 0)
            {
                reportAccessLevel.Add(ReportAccessLevel.Operations);
            }
            return reportAccessLevel.Count()>0?reportAccessLevel.ToArray():null;
        }

    }
}
