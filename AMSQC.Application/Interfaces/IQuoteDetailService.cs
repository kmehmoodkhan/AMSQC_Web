using AMSQC.Domain.Models;
using AMSQC.Domain.Models.Reports;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AMSQC.Application.Interfaces
{
    public interface IQuoteDetailService
    {
        QuoteDetail GetQuoteDetail(int quoteId, int regionId);

        int AddQuoteDetail(QuoteDetail quoteDetail);

        int DeleteQuote(int quoteId, int regionId);
        List<AuditSummaryViewModel> GetAuditSummaryList(ReportParameterModel parameters);
        ComplianceSummaryViewModel GetComplianceSummary(ReportParameterModel parameters);
        CmComplianceViewModel GetCmComplianceSummary(ReportParameterModel parameters);
        CostOfCarViewModel GetCostOfCARSummary(ReportParameterModel parameters);
        ComplianceSummaryViewModel GetInitialInspectionResults(ReportParameterModel parameters);
        UserSurveyResponseViewModel GetSurveyAnswers(int quoteDetailId, string userGuid);

        QuoteDetail GetAuditQuote(int quoteId,int regionId);
        int UpdateAuditQuote(int quoteDetailId, string userGuid);
    }
}
