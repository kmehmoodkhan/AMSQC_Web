using AMSQC.Application.Interfaces;
using AMSQC.Application.Services;
using AMSQC.Domain.Repository;
using AMSQC.Infra.Data.Repository;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Text;

namespace AMSQC.Infra.IoC
{
    public class DepedencyContainer
    {
        public static void RegisterServices(IServiceCollection services)
        {
            
            services.AddScoped<IQouteService, QouteService>();

            //CleanArchitecture.Domain.Interfaces | CleanArchitecture.Infra.Data.Repositories
            services.AddScoped<IQuoteRepository, QuoteRepository>();
        }
        //services.AddScoped<IProductService, ProductService>();
        //services.AddScoped<IProductRepository, ProductRepository>();
        //services.AddScoped<IOrderService, OrderService>();
        //services.AddScoped<IProductPrintService, ProductPrintConsole>();
        //services.AddScoped<IVendorMachine, VMConsole>();
    
    }
}
