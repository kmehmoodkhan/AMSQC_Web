using AMSQC.Domain.Models;
using AMSQC.Domain.Models.Reports;
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
        int UpdateQuote(int quoteId, int regionId, int userId,bool isSublet,bool isCAR, int category);
        List<AuditSummaryViewModel> GetQuotesList(ReportParameterModel parameterModel);
        ComplianceSummaryViewModel GetComplianceSummary(ReportParameterModel parameterModel);
        CmComplianceViewModel GetCmComplianceSummary(ReportParameterModel parameters);
        CostOfCarViewModel GetCostOfCARSummary(ReportParameterModel parameters);
        ComplianceSummaryViewModel GetInitialInspectionResults(ReportParameterModel parameters);
        UserSurveyResponseViewModel GetSurveyAnswers(int quoteDetailId, string userGuid);
    }
}
