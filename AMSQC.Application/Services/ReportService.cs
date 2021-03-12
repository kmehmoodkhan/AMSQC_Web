using AMSQC.Application.Interfaces;
using AMSQC.Application.ViewModels;
using AMSQC.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AMSQC.Application.Services
{
    public class ReportService : IReportService
    {
        IQuoteDetailService _quoteDetailService = null;
        public ReportService(IQuoteDetailService quoteDetailService)
        {
            _quoteDetailService = quoteDetailService;
        }
        public AuditSummaryViewModel GetAuditSummaryData(ReportParameterModel parameters)
        {
            return null; 
        }
    }
}
