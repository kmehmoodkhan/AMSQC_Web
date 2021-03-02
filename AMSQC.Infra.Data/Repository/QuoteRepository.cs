using AMSQC.Domain.Models;
using AMSQC.Domain.Repository;
using AMSQC.Infra.Data.Context;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using System.Data.Entity.Infrastructure;
using System.Collections.Generic;

namespace AMSQC.Infra.Data.Repository
{
    public class QuoteRepository : IQuoteRepository
    {
        public BodyShopDbContext _context;
        public QuoteRepository(BodyShopDbContext context)
        {
            _context = context;
        }
        public Quote GetQuote(int id,int regionId)
        {
            //var query = _context.Quote.FromSqlRaw("select top 1 VehiclemakeGroup,Vehicle_model,Vehicle_registration,estimate_number,vehicle_colour,Debtor_Name from [ama].[vw_Jobs_In_and_Out_QualityCharter] where Site_Id='"+regionId+"' and  Estimate_Number = '"+ id + "'").ToList();

            var query = _context.Quote.FromSqlRaw("select top 1 VehiclemakeGroup,Vehicle_model,Vehicle_registration,estimate_number,vehicle_colour,Debtor_Name from [ama].[vw_Jobs_In_and_Out_QualityCharter] where Estimate_Number = '" + id + "'").ToList();

            //_context.Database.SetCommandTimeout(10000);
            //IQueryable<Quote> query = _context.Quote.Where(t => t.QuoteId == id);
            //var sql = query.ToQueryString();
            return query.FirstOrDefault();
        }

    }
}
