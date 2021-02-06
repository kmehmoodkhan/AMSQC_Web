using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace AMSQC.Domain.Models
{
    public class Quote
    {
        [Key]
        public int QuoteId { get; set; }
        public string Company { get; set; }
        public string Model { get; set; }
        public string Color { get; set; }
        public string Registration { get; set; }

        public string InsurerName { get; set; }
    }
}
