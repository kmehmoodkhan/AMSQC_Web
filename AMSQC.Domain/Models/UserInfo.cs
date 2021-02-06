using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
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

        public string UserGuid { get; set; }

        public string UserName { get; set; }

        public string Region { get; set; }

        public int RegionId { get; set; }

        public DateTime CreatedOn { get; set; }
	}
}
