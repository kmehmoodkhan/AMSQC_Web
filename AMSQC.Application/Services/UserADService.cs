using AMSQC.Application.Interfaces;
using AMSQC.Domain.Models;
using AMSQC.Infra.Data.Context;
using Microsoft.Graph;
using Microsoft.Identity.Client;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AMSQC.Application.Services
{
    public class UserADService : IUserADService
    {
        private IGraphProvider _graphClient;

        public UserADService(IGraphProvider graphClient)
        {
            _graphClient = graphClient;
        }
        public async Task<string> GetRegion(string token)
        {


            var user = await _graphClient.GetRegion("")
                .ConfigureAwait(false);

            return "";
        }

        public List<UserInfo> GetUsers(int regionId)
        {
            List<UserInfo> users = new List<UserInfo>();
            users.Add(new UserInfo() { UserGuid = "12344", UserName = "John Martin" });
            users.Add(new UserInfo() { UserGuid = "56633", UserName = "Maria Zegara" });
            return users;
        }

   
    }
}
