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

namespace AMSQC.Infra.IoC
{
    public class DepedencyContainer
    {
        public static void RegisterServices(IServiceCollection services, IConfiguration configuration)
        {
            SqlAuthenticationProvider.SetProvider(SqlAuthenticationMethod.ActiveDirectoryInteractive, new SqlAppAuthenticationProvider());

            var ibodyShopConnectionString = $"{configuration["ConnectionStrings:IBodyShopDb"]}";
            var defaultConnectionString = $"{configuration["ConnectionStrings:Default"]}";

            services.AddDatabaseDeveloperPageExceptionFilter();

            var managedIdentityInterceptor = new ConnectionInterceptor($"{configuration["AzureAD:TenantId"]}");
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
        }    
    }
}
