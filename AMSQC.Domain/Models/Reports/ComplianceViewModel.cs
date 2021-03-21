using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AMSQC.Domain.Models.Reports
{
    public class ComplianceViewModel
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
    }
}
