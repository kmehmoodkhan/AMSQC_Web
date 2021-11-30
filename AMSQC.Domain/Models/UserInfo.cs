using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace AMSQC.Domain.Models
{
    public class UserInfo
    {
        [Key]
        public int UserId
        {
			get;
			set;
        }
        
        public Guid UserGuid { get; set; }

        public string UserName { get; set; }

        public string FullName { get; set; }

        public string Region { get; set; }

        public int RegionId { get; set; }

        
        public DateTime CreatedOn { get; set; }

        [NotMapped]
        [JsonIgnore]
        public ReportAccessLevel[] ReportAccessLevel { get; set; }

        [NotMapped]
        [JsonIgnore]
        public string FirstName { get; set; }
        
        [NotMapped]
        [JsonIgnore]
        public string LastName { get; set; }

        [NotMapped]
        [JsonIgnore]
        public string Role { get; set; }

        [NotMapped]
        [JsonIgnore]
        public int SiteId { get; set; }

        [NotMapped]
        [JsonIgnore]
        public string ActiveDirectorySiteName { get; set; }
    }

}
