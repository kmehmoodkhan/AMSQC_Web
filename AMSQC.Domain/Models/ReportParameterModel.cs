﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AMSQC.Domain.Models
{
    public class ReportParameterModel
    {
        public int QuoteNo { get; set; }

        public int RegionId { get; set; }

        public int CenterId { get; set; }

        public int UserId { get; set; }

        public DateTime FromDate { get; set; }

        public DateTime EndDate { get; set; }

        public bool IgnoreDates { get; set; }

        public ReportType ReportType { get; set; }

        public bool IsAudit { get; set; }
    }
}
