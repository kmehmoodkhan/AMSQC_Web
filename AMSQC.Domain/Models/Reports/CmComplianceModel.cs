using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AMSQC.Domain.Models.Reports
{
    public class CmComplianceModel
    {
        public string Title
        {
            get;set;
        }

        public bool IsState { get; set; }

        public int CmAuditCount
        {
            get;set;
        }

        public int SiteAuditCount { get; set; }

        public int StateId { get; set; }

        public string State { get; set; }
    }

    public class CmComplianceViewModel
    {
        public List<CmComplianceModel> ComplianceData { get; set; }
    }

    public class CmQuoteData
    {
        public int StateId { get; set; }
        public string State { get; set; }
        public int SiteId { get; set; }
        public string Site { get; set; }
        public bool IsAudit { get; set; }
        public int QuoteId { get; set; }
    }
}
