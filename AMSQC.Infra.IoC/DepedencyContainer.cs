using AMSQC.Application.Interfaces;
using AMSQC.Application.Services;
using AMSQC.Application.ViewModels;
using AMSQC.Domain.Repository;
using AMSQC.Infra.Data.Repository;
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
        public static void RegisterServices(IServiceCollection services)
        {


            //services.Configure<StorageSetting>(Configuration.GetSection("StorageSettings"));

            services.AddScoped<IStorageService, StorageService>();
            services.AddScoped<IQouteService, QouteService>();

            //CleanArchitecture.Domain.Interfaces | CleanArchitecture.Infra.Data.Repositories
            services.AddScoped<IQuoteRepository, QuoteRepository>();
        }    
    }
}
