﻿using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AMSQC.UI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    // [Authorize]
    public class QuoteController : ControllerBase
    {
        IWebHostEnvironment liveEnv = null;
        public QuoteController(IWebHostEnvironment env)
        {
            liveEnv = env;
        }
        [HttpGet]
        public Response Get(string quoteNo)
        {
            var quote = new Quote();
            quote.Company = "Honda";
            quote.Model = "Civic";
            quote.Color = "Red";
            quote.Registration = "ABC 4005";
            return new Response { Result = new { quote, alreadySubmitted = false }, Success = true, StatusCode = System.Net.HttpStatusCode.OK };
        }
    }
}
