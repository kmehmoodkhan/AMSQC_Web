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
        IStorageService _storageService = null;
        public QuoteController(IQouteService quouteService,IStorageService storageService)
        {
            _quouteService = quouteService;
            _storageService = storageService;
        }
        [HttpGet]
        public Response Get(int quoteNo)
        {
            var quote = new Quote();
            quote.Company = "Honda";
            quote.Model = "Civic";
            quote.Color = "Red";
            quote.Registration = "ABC 4005";

            //var quote = _quouteService.GetQuote(quoteNo);
            return new Response 
            { 
                Result = new { quote, alreadySubmitted = false }, 
                Status = Common.Status.Success,
                HttpStatusCode = System.Net.HttpStatusCode.OK,
                Message = ""
            };
        }

        [HttpPost]
        [Consumes("multipart/form-data")]
        public async Task<Response> Post([FromForm]QuoteViewModel quoteFile)
        {
            BlobEntity blob = new BlobEntity()
            {
                Title = quoteFile.MappingSheet.FileName,
                File = quoteFile.MappingSheet
        };

            var result = await _storageService.SaveBlobAsync(blob);

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
