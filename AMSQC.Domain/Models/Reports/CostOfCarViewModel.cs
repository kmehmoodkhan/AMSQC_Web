using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AMSQC.Domain.Models.Reports
{
     public class StateData
    {
        public int StateId { get; set; }
        public string Title { get; set; }

        public List<StateQuoteDetail> QuotesList { get; set; }
    }

    public class StateQuoteDetail
    {
        public int QuoteNo { get; set; }

        public string UserResponsible { get; set; }

        public DateTime CompletionDate { get; set; }

        public string Site { get; set; }

        public  int AnswerId { get; set; }

        public double Cost { get; set; }
    }
}
