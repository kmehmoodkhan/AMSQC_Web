using AMSQC.Application.Interfaces;
using AMSQC.Application.Services;
using AMSQC.Application.ViewModels;
using AMSQC.Domain.Repository;
using AMSQC.Infra.Data.Context;
using AMSQC.Infra.Data.Repository;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Text;

namespace AMSQC.Infra.IoC
{
    public class DepedencyContainer
    {
        public static void RegisterServices(IServiceCollection services, IConfiguration configuration)
        {

            var ibodyShopConnectionString = $"{configuration["ConnectionStrings:IBodyShopDb"]}";
            var defaultConnectionString = $"{configuration["ConnectionStrings:Default"]}";

            var managedIdentityInterceptor = new ConnectionInterceptor($"{configuration["AzureAD:TenantId"]}");
            services.AddDbContext<BodyShopDbContext>(o =>
                o.UseSqlServer(ibodyShopConnectionString).AddInterceptors(managedIdentityInterceptor));

            services.AddDbContext<AmsqcDbContext>(o =>
                o.UseSqlServer(defaultConnectionString).AddInterceptors(managedIdentityInterceptor));
            //services.Configure<StorageSetting>(Configuration.GetSection("StorageSettings"));

            services.AddScoped<IStorageService, StorageService>();
            services.AddScoped<IQuoteService, QuoteService>();
            services.AddScoped<IQuoteRepository, QuoteRepository>();

            services.AddScoped<IQuoteDetailService, QuoteDetailService>();
            services.AddScoped<IQuoteDetailRepository, QuoteDetailRepository>();
        }    
    }
}
