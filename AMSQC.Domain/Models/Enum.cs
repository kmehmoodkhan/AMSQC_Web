using System;
using System.Collections.Generic;
using System.Text;

namespace AMSQC.Domain.Models
{
    public enum Status { Failed = 0, Success = 1 };

    public enum SurveyType { SurveyType1 = 1, SurveyType2 = 2, SurveyType3 = 3,CorrectiveActionRequest=4};

    public enum ParentType { None = 0, SurveyType1 = 1, SurveyType2 = 2, SurveyType3 = 3};

    public enum ReportType { AuditSummary=1, Compliance, CmCompliance, CmAudit, CostOfCar, JobsNotAudited, InitialInspectionResults, CsvExport}
}
