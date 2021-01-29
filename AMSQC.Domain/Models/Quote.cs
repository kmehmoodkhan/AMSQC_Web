using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace AMSQC.Domain.Models
{
    public class Quote
    {
        public int QuoteId { get; set; }
        public string Company { get; set; }
        public string Model { get; set; }

        [NotMapped]
        public string Color { get; set; }
        public string Registration { get; set; }
    }
}
