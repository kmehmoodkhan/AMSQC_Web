using AMSQC_UI.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace AMSQC_UI
{
    public class Response
    {
        public Status Status { get; set; }
        public HttpStatusCode HttpStatusCode { get; set; }
        public dynamic Result { get; set; }
        public string Message { get; set; }
    }
}
