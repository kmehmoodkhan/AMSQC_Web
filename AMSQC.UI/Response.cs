using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace AMSQC.UI
{
    public class Response
    {
        public bool Success { get; set; }
        public HttpStatusCode StatusCode { get; set; }
        public dynamic Result {get;set;}
    }
}

