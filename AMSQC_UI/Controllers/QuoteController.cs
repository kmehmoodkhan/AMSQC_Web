using AMSQC.Application.Interfaces;
using AMSQC.Application.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AMSQC_UI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class QuoteController : ControllerBase
    {
        IQouteService _quouteService = null;
        public QuoteController(IQouteService quouteService)
        {
            _quouteService = quouteService;
        }
        [HttpGet]
        public Response Get(int quoteNo)
        {
            //var quote = new Quote();
            //quote.Company = "Honda";
            //quote.Model = "Civic";
            //quote.Color = "Red";
            //quote.Registration = "ABC 4005";

            var quote = _quouteService.GetQuote(quoteNo);
            return new Response 
            { 
                Result = new { quote, alreadySubmitted = false }, 
                Status = Common.Status.Success,
                HttpStatusCode = System.Net.HttpStatusCode.OK,
                Message = ""
            };
        }

        [HttpPost]
        public Response Post(QuoteViewModel quoteFile)
        {
            return new Response
            {
                Status = Common.Status.Success,
                HttpStatusCode = System.Net.HttpStatusCode.OK,
                Message = "File uploaded successfully.",
                Result = ""
            };
        }
    }
}
