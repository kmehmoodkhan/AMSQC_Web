using AMSQC.Domain.Models;
using AMSQC.Domain.Repository;
using AMSQC.Infra.Data.Context;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using System.Data.Entity.Infrastructure;

namespace AMSQC.Infra.Data.Repository
{
    public class QuoteRepository : IQuoteRepository
    {
        public QuoteDbContext _context;
        public QuoteRepository(QuoteDbContext context)
        {
            _context = context;
        }
        public Quote GetQuote(int id)
        {
            //var query = _context.Database.fr<Quote>("select top 1 * from [ama].[vw_Jobs_In_and_Out_QualityCharter] where Estimate_Number = 67283");
            var query = _context.Quote.FromSqlRaw("select top 1 VehiclemakeGroup,Vehicle_model,Vehicle_registration,estimate_number,vehicle_colour from [ama].[vw_Jobs_In_and_Out_QualityCharter] where Estimate_Number = '"+ id + "'").ToList();

            //_context.Database.SetCommandTimeout(10000);
            //IQueryable<Quote> query = _context.Quote.Where(t => t.QuoteId == id);
            //var sql = query.ToQueryString();
            return query.FirstOrDefault();
        }
    }
}
