using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AMSQC.Domain.Models
{
    public class AuditSummaryViewModel
    {
        public int QuoteNo { get; set; }

        public string FullName { get; set; }

        public DateTime DateCompleted { get; set; }

        public string MappingSheetUrl { get; set; }

        public int CategoryId { get; set; }

        public bool IsCARAnswered { get; set; }

        public bool IsSublet { get; set; }

        public int AnswersKey { get; set; }
    }

    public class ComplianceViewModel
    {
        public List<RegionData> RegionsData = null;

        public ComplianceViewModel()
        {
            RegionsData = new List<RegionData>();

            RegionsData[0].ChildList = new List<RegionData>();
        }
    }

    public class RegionData
    {
        public string Title { get; set; }
        public int? JobsCompleted { get; set; }
        public int? JobsAudited { get; set; }
        public int? Compliance { get; set; }

        public bool IsSummary { get; set; }

        public dynamic ChildList { get; set; }
    }

}
