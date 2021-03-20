using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AMSQC.Domain.Models
{
    [Serializable]
    public class ComplianceSummaryViewModel
    {
        public List<RegionData> RegionsData = null;

        public ComplianceSummaryViewModel()
        {
            RegionsData = new List<RegionData>();

        }
    }

    public class RegionData
    {
        public string Title { get; set; }
        public int? JobsCompleted { get; set; }

        public int? JobsWithCARs { get; set; }

        public double? Performance { get; set; }
        public int? JobsAudited { get; set; }
        public double? Compliance { get; set; }
        public bool IsSummary { get; set; }
        public List<RegionData> ChildList { get; set; }
    }

    public class SiteLevelData
    {
        public int SiteId { get; set; }

        public string SiteName { get; set; }        

        public int StateId { get; set; }

        public string State { get; set; }
        public int QuoteDetailId { get; set; }
    }
}
