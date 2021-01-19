using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AMSQC_Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
   [Authorize]
    public class QuoteController : ControllerBase
    {
        [HttpGet]
        public Quote Get(string quoteNo)
        {
            var quote = new Quote();
            quote.Company = "Honda";
            quote.Model = "Civic";
            quote.Color = "Red";
            quote.Registration = "ABC 4005";
            return quote;
        }
    }
}
