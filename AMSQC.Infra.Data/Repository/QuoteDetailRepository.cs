using AMSQC.Domain.Models;
using AMSQC.Domain.Repository;
using AMSQC.Infra.Data.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AMSQC.Infra.Data.Repository
{
    public class QuoteDetailRepository : IQuoteDetailRepository
    {
        public AmsqcDbContext _context;
        public QuoteDetailRepository(AmsqcDbContext context)
        {
            _context = context;
        }

        public int AddQuoteDetail(QuoteDetail quoteDetail)
        {
            _context.QuoteDetail.Add(quoteDetail);
            _context.SaveChanges();
            return 1;
        }

        public QuoteDetail GetQuoteDetail(int quoteId, int regionId)
        {
            var quoteDetail = _context.QuoteDetail.Where(t => t.QuoteId == quoteId && t.RegionId == regionId).FirstOrDefault();
            return quoteDetail;
        }

        
    }
}
