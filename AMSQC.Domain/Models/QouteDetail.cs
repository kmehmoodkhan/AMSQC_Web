using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AMSQC.Domain.Models
{
    public class QouteDetail
    {
		[Key]
        public int QuoteId { get; set; }

        public int QouteNo { get; set; }

        public string UserGuid { get; set; }
        public int RegionId { get; set; }

        public string MappingSheetPath { get; set; }

        public DateTime CreatedOn { get; set; }

        public string InsurerName { get; set; }

        public string VehicleColor { get; set; }

        public string VehicleModel { get; set; }

        public string VehicleRegistration { get; set; }

        public string VehicleMake { get; set; }

        public bool IsAudit { get; set; }
    }
}
