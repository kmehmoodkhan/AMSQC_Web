using AMSQC.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AMSQC.Domain.Repository
{
    public interface IQuoteDetailRepository
    {
        QuoteDetail GetQuoteDetail(int quoteId, int regionId);
        int AddQuoteDetail(QuoteDetail quoteDetail);
        int DeleteQuote(int quoteId,int regionId);
        int UpdateQuote(int quoteId, int regionId, int userId);
        List<AuditSummaryViewModel> GetQuotesList(ReportParameterModel parameterModel);
    }
}
