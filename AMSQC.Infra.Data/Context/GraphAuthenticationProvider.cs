using Microsoft.Extensions.Options;
using Microsoft.Graph;
using Microsoft.IdentityModel.Clients.ActiveDirectory;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Identity.Web;
using Microsoft.Extensions.Configuration;

namespace AMSQC.Infra.Data.Context
{
    public class GraphAuthenticationProvider
    {
        public const string GRAPH_URI = "https://graph.microsoft.com/";
        private string _tenantId { get; set; }
        private string _clientId { get; set; }
        private string _clientSecret { get; set; }

        public GraphAuthenticationProvider(IConfiguration configuration)
        {
            _tenantId = configuration.GetValue<string>("AzureAD:TenantId");
            _clientId = configuration.GetValue<string>("AzureAD:ClientId");
            _clientSecret = configuration.GetValue<string>("AzureAD:ClientSecret");
        }

        public async Task<DelegateAuthenticationProvider> AuthenticateRequestAsync()
        {
            AuthenticationContext authContext = new AuthenticationContext($"https://login.microsoftonline.com/{_tenantId}");

            ClientCredential creds = new ClientCredential(_clientId, _clientSecret);

            AuthenticationResult authResult = await authContext.AcquireTokenAsync(GRAPH_URI, creds);

            var token = authResult.AccessToken;

            var delegateAuthProvider = new DelegateAuthenticationProvider((requestMessage) => {
                requestMessage.Headers.Authorization = new AuthenticationHeaderValue("bearer", token.ToString());
                return Task.FromResult(0);
            });

            return delegateAuthProvider;

            //request.Headers.Add("Authorization", "Bearer " + authResult.AccessToken);
        }

        public async Task<GraphServiceClient> GetGraphServiceClient()
        {
            var delegateAuthProvider = await AuthenticateRequestAsync();
            // Initializing the GraphServiceClient
            string graphResource = "https://graph.microsoft.com/v1.0";
            var graphClient = new GraphServiceClient(graphResource, delegateAuthProvider);
            return graphClient;
        }
    }

    public interface IGraphProvider
    {
        Task<string> GetRegion(string region);
    }

    public class MicrosoftGraphProvider : IGraphProvider
    {
        private readonly GraphAuthenticationProvider _graphServiceClient;

        public MicrosoftGraphProvider(GraphAuthenticationProvider graphServiceClient)
        {
            _graphServiceClient = graphServiceClient;
        }

        public async Task<string> GetRegion(string region)
        {
            GraphServiceClient client = await _graphServiceClient.GetGraphServiceClient();

            var user = await client.Me.Request().GetAsync();

            if (user == null || string.IsNullOrEmpty(user.Id))
            {
                return string.Empty;
            }

            return user.Id;
        }

    }
}
