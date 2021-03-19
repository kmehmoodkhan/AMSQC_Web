using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AMSQC.Domain.Models.Reports
{
    public class JobsNotAuditedViewModel
    {
        public int QuoteNo { get; set; }

        public string Make { get; set; }

        public string Vehicle { get; set; }

        public string Color { get; set; }

        public string Registration { get; set; }

        public DateTime CompletionDate { get; set; }
    }
}
