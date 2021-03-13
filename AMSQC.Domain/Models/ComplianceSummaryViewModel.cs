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
        public int? JobsAudited { get; set; }
        public int? Compliance { get; set; }
        public bool IsSummary { get; set; }
        public List<RegionData> ChildList { get; set; }
    }
}
