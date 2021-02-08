using Microsoft.Azure.Services.AppAuthentication;
using Microsoft.EntityFrameworkCore.Diagnostics;
using System;
using System.Collections.Generic;
using System.Data.Common;
using Microsoft.Data.SqlClient;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace AMSQC.Infra.Data.Context
{
    //public class ConnectionInterceptor: DbConnectionInterceptor
    //{
    //    private const string AzureSqlResourceId = "https://database.windows.net/";
    //    private readonly string _tenantId;
    //    private readonly AzureServiceTokenProvider _tokenProvider;

    //    public ConnectionInterceptor(string tenantId)
    //    {
    //        _tenantId = string.IsNullOrEmpty(tenantId) ? null : tenantId;
    //        _tokenProvider = new AzureServiceTokenProvider();
    //    }

    //    public override InterceptionResult ConnectionOpening(DbConnection connection, ConnectionEventData eventData, InterceptionResult result)
    //    {
    //        var sqlConnection = (SqlConnection)connection;
    //        var provider = new AzureServiceTokenProvider();
    //        var r1 = GetAccessTokenAsync();
    //        sqlConnection.AccessToken = r1.Result;
    //        return result;
    //    }

    //    public override async ValueTask<InterceptionResult> ConnectionOpeningAsync(
    //    DbConnection connection,
    //    ConnectionEventData eventData,
    //    InterceptionResult result,
    //    CancellationToken cancellationToken = default)
    //    {
    //        var sqlConnection = (SqlConnection)connection;
    //        var provider = new AzureServiceTokenProvider();
    //        sqlConnection.AccessToken = await GetAccessTokenAsync();
    //        return result;
    //    }

    //    private  Task<string> GetAccessTokenAsync()
    //    {
    //        return  _tokenProvider.GetAccessTokenAsync(AzureSqlResourceId, _tenantId);
    //    }
    //}
}
