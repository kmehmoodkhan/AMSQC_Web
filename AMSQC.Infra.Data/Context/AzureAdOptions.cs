using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AMSQC.Infra.Data.Context
{
    public class AzureAdOptions
    {
        public string Instance { get; set; }
        public string ClientId { get; set; }
        public string TenantId { get; set; }
        public string Authority => Instance + TenantId;
        public string ClientSecret { get; set; }

        public string GraphResource { get; set; }
        public string GraphResourceEndPoint { get; set; }
    }
}
