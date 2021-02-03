using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AMSQC.Domain.Models
{
    public class QuoteDetail: Quote
    {
        //[Key]
        //      public int QuoteId { get; set; }

        //public int QouteNo { get; set; }

        public string UserName { get; set; }
        public string UserGuid { get; set; }
        public int RegionId { get; set; }

        public string MappingSheetPath { get; set; }

        public DateTime CreatedOn { get; set; }

        public string InsurerName { get; set; }

        public string VehicleColor
        {
            get
            {
                return Color;
            }
        }

        public string VehicleModel
        {
            get
            {
                return Model;
            }
        }

        public string VehicleRegistration
        {
            get
            {
                return Registration;
            }
        }
        public string VehicleMake
        {
            get
            {
                return Company;
            }
        }


        public bool IsAudit { get; set; }
    }
}
