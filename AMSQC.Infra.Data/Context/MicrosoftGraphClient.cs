using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.AzureAD.UI;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using Microsoft.Graph;
using Microsoft.Identity.Web;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace AMSQC.Infra.Data.Context
{
    public class GraphClient
    {
        private readonly ITokenAcquisition _tokenAcquisition;
        private readonly IHttpClientFactory _clientFactory;

        public GraphClient(ITokenAcquisition tokenAcquisition,
            IHttpClientFactory clientFactory)
        {
            _clientFactory = clientFactory;
            _tokenAcquisition = tokenAcquisition;
        }

        public async Task<User> GetGraphApiUser()
        {
            var graphclient = await GetGraphClient(new string[] { "User.ReadBasic.All", "user.read" });

            var user = await graphclient.Me.Request().GetAsync();
            return user;
        }

        public async Task<string> GetGraphApiProfilePhoto()
        {
            try
            {
                var graphclient = await GetGraphClient(new string[] { "User.ReadBasic.All", "user.read" })
               .ConfigureAwait(false);

                var photo = string.Empty;
                // Get user photo
                using (var photoStream = await graphclient.Me.Photo
                    .Content.Request().GetAsync().ConfigureAwait(false))
                {
                    byte[] photoByte = ((MemoryStream)photoStream).ToArray();
                    photo = Convert.ToBase64String(photoByte);
                }

                return photo;
            }
            catch
            {
                return string.Empty;
            }
        }

       

        private async Task<GraphServiceClient> GetGraphClient(string[] scopes)
        {

            var token = await _tokenAcquisition.GetAccessTokenForUserAsync(
             scopes);

            var client = _clientFactory.CreateClient();
            client.BaseAddress = new Uri("https://graph.microsoft.com/v1.0");
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

            GraphServiceClient graphClient = new GraphServiceClient(client)
            {
                AuthenticationProvider = new DelegateAuthenticationProvider(async (requestMessage) =>
                {
                    requestMessage.Headers.Authorization = new AuthenticationHeaderValue("bearer", token);
                })
            };

            graphClient.BaseUrl = "https://graph.microsoft.com/v1.0";
            return graphClient;
        }

        private static string StreamToString(Stream stream)
        {
            stream.Position = 0;
            using (StreamReader reader = new StreamReader(stream, Encoding.UTF8))
            {
                return reader.ReadToEnd();
            }
        }
    }
}
