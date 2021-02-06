using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AMSQC.Domain.Models
{
    [Table("QuoteDetail")]
    public class QuoteDetail
    {
        [Key]
        public int QuoteDetailId { get; set; }

        public int QuoteId { get; set; }

        [NotMapped]
        public string UserGuid { get; set; }

        public int UserId { get; set; }

        public int RegionId { get; set; }

        [NotMapped]
        public string Region { get; set; }

        public string MappingSheetPath { get; set; }

        public DateTime CreatedOn { get; set; }


        string _insurerName = string.Empty;
        public string InsurerName {
            get
            {
                return _insurerName;
            }
            set
            {
                _insurerName = value;
            }
        }

        string _vehicleColor = string.Empty;
        public string VehicleColor
        {
            get
            {
                return _vehicleColor;
            }
            set
            {
                _vehicleColor = value;
            }
        }

        string _vehicleModel = string.Empty;
        public string VehicleModel
        {
            get
            {
                return _vehicleModel;
            }
            set
            {
                _vehicleModel = value;
            }
        }

        string _vehicleRegistration = string.Empty;
        public string VehicleRegistration
        {
            get
            {
                return _vehicleRegistration;
            }
            set
            {
                _vehicleRegistration = value;
            }
        }

        string _vehicleMake = string.Empty;
        public string VehicleMake
        {
            get
            {
                return _vehicleMake;
            }
            set
            {
                _vehicleMake = value;
            }
        }

        public bool IsAudit { get; set; }

        [NotMapped]
        public string UserName { get; set; }

        [NotMapped]
        public string Company { get { return _company; } set { _company = value; } }
        string _company = string.Empty;


        [NotMapped]
        public string Model
        {
            get { return _model; }
            set { _model = value; }
        }

        string _model = string.Empty;

        [NotMapped]
        public string Color { get { return _color; } set { _color = value; } }

        string _color = string.Empty;

        [NotMapped]
        public string Registration { get { return _registration; } set { _registration = value; } }

        string _registration = string.Empty;


        public bool IsSubmit { get; set; }
    }
}
