using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AMSQC.Domain.Models.Reports
{
   
    public class InspectionResultsStateLevel
    {
        public int StateId { get; set; }
        public string Title { get; set; }

        public List<InspetionResultDetail> InspectionDetail { get; set; }
    }

    public class InspetionResultDetail
    {
        public string Title { get; set; }

        public int JobsAudited { get; set; }

        public int JobsWithCARs { get; set; }

        public Double Performance { get; set; }
    }


}
