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
            var result = _context.SaveChanges();
            return quoteDetail.QuoteDetailId;
        }

        public QuoteDetail GetQuoteDetail(int quoteId, int regionId)
        {
            var quoteDetail = _context.QuoteDetail.Where(t => t.QuoteId == quoteId && t.RegionId == regionId && t.IsSubmit==true).FirstOrDefault();
            return quoteDetail;
        }

        public int DeleteQuote(int quoteId, int regionId)
        {
            int rows = 0;
            var quoteDetail = _context.QuoteDetail.Where(t => t.QuoteId == quoteId && t.RegionId == regionId && t.IsSubmit == false);
            if (quoteDetail != null)
            {
                _context.RemoveRange(quoteDetail);
                rows = _context.SaveChanges();
            }
            return rows;
        }

        public int UpdateQuote(int quoteId, int regionId, int userId)
        {
            int result = 0;
            var quoteDetail = _context.QuoteDetail.Where(t => t.QuoteDetailId==quoteId).FirstOrDefault();
            if (quoteDetail != null)
            {
                quoteDetail.IsSubmit = true;
                _context.QuoteDetail.Update(quoteDetail);
                result = _context.SaveChanges();
            }
            return result;
        }
    }
}
