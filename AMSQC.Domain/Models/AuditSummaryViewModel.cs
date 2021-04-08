using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AMSQC.Domain.Models
{
    public class AuditSummaryViewModel
    {
        public int QuoteDetailId { get; set; }
        public int QuoteNo { get; set; }

        public string FullName { get; set; }

        public DateTime DateCompleted { get; set; }

        public string MappingSheetUrl { get; set; }

        public int CategoryId { get; set; }

        public bool IsCARAnswered { get; set; }

        public bool IsSublet { get; set; }

        public int AnswersKey { get; set; }
    }


}
