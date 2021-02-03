using AMSQC.Application.Interfaces;
using AMSQC.Application.ViewModels;
using AMSQC.Domain.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
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
        //ILogger _logger = null;
        public QuoteController(IQouteService quouteService, IStorageService storageService)
        {
            _quouteService = quouteService;
            _storageService = storageService;
            //_logger = logger;
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
                Status = Status.Success,
                HttpStatusCode = System.Net.HttpStatusCode.OK,
                Message = ""
            };
        }

        [HttpPost]
        [Consumes("multipart/form-data")]
        public async Task<Response> Post([FromForm] QuoteViewModel quoteFile)
        {
            BlobEntity blob = new BlobEntity()
            {
                Title = quoteFile.MappingSheet.FileName,
                File = quoteFile.MappingSheet
            };

            try
            {
                var result = await _storageService.SaveBlobAsync(blob);
                //_logger.LogInformation("File path=>" + result, string.Format("QouteId=>{0}", quoteFile.QuoteId));

                return new Response
                {
                    Status = Status.Success,
                    HttpStatusCode = System.Net.HttpStatusCode.OK,
                    Message = "File uploaded successfully.",
                    Result = ""
                };
            }
            catch (Exception ex)
            {
                //_logger.LogError(ex.Message, string.Format("QouteId=>{0}",quoteFile.QuoteId));

                return new Response
                {
                    Status = Status.Failed,
                    HttpStatusCode = System.Net.HttpStatusCode.InternalServerError,
                    Message = ex.Message,
                    Result = ""
                };
            }
        }
    }
}
