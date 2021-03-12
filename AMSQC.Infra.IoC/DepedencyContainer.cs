using AMSQC.Application.Interfaces;
using AMSQC.Application.Services;
using AMSQC.Application.ViewModels;
using AMSQC.Domain.Repository;
using AMSQC.Infra.Data.Context;
using AMSQC.Infra.Data.Repository;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Diagnostics.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Text;
using Microsoft.Data.SqlClient;
using Microsoft.Identity.Web;
using Microsoft.AspNetCore.Http;
using Microsoft.Graph;
using Microsoft.Identity.Web.TokenCacheProviders.InMemory;
using Microsoft.AspNetCore.Builder;

namespace AMSQC.Infra.IoC
{
    public class DepedencyContainer
    {
        public static void RegisterServices(IServiceCollection services, IConfiguration configuration)
        {
            //services.AddScoped<IAuthenticationProvider, GraphAuthenticationProvider>();
            services.AddScoped<GraphAuthenticationProvider>();
            //services.AddScoped<IGraphServiceClient, GraphServiceClient>();
            services.AddScoped<IGraphProvider, MicrosoftGraphProvider>();
            //services.AddHttpClient()
            ////services.AddScoped<GraphClientAuthProvider>();
            //services.AddScoped<GraphClient>();

            SqlAuthenticationProvider.SetProvider(SqlAuthenticationMethod.ActiveDirectoryInteractive, new SqlAppAuthenticationProvider());

            var ibodyShopConnectionString = $"{configuration["ConnectionStrings:IBodyShopDb"]}";
            var defaultConnectionString = $"{configuration["ConnectionStrings:Default"]}";

            services.AddDatabaseDeveloperPageExceptionFilter();


            services.Configure<AzureAdOptions>(configuration.GetSection("AzureAd"));
            //services.AddScoped<IAuthenticationProvider, GraphAuthenticationProvider>();
            //services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            //services.AddScoped<IIdentityService, AzureAdIdentityService>();

            //var managedIdentityInterceptor = new ConnectionInterceptor($"{configuration["AzureAD:TenantId"]}");
            services.AddDbContext<BodyShopDbContext>(o =>
                o.UseSqlServer(ibodyShopConnectionString));//.AddInterceptors(managedIdentityInterceptor));

            services.AddDbContext<AmsqcDbContext>(o =>
                o.UseSqlServer(defaultConnectionString));//.AddInterceptors(managedIdentityInterceptor));
            //services.Configure<StorageSetting>(Configuration.GetSection("StorageSettings"));

            services.AddScoped<IStorageService, StorageService>();

            services.AddScoped<IQuoteService, QuoteService>();
            services.AddScoped<IQuoteRepository, QuoteRepository>();

            services.AddScoped<IQuoteDetailService, QuoteDetailService>();
            services.AddScoped<IQuoteDetailRepository, QuoteDetailRepository>();

            services.AddScoped<ISurveyService, SurveyService>();
            services.AddScoped<ISurveyRepository, SurveyRepository>();

            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IUserRepository, UserRepository>();

            services.AddScoped<IUserADService, UserADService>();

            services.AddScoped<IRegionService, RegionService>();
            services.AddScoped<IRegionRepository, RegionRepository>();

            services.AddScoped<IStateService, StateService>();
            services.AddScoped<IStateRepository, StateRepository>();

            //services.AddScoped<GraphClientAuthProvider>();
            //services.AddScoped<GraphClient>();
            //services.AddScoped<GraphServiceClient>();
        }    
    }
}
