using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AMSQC.Domain.Models
{
    public class Site
    {
        public int SiteId { get; set; }

        public string Title { get; set; }

        public int RegionId { get; set; }

        public int StateId { get; set; }
    }
}
