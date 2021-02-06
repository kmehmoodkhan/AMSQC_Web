
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
        const int CONST_REGION_ID = 2102;
        IQuoteService _quouteService = null;
        IStorageService _storageService = null;
        IQuoteDetailService _quoteDetailService = null;
        //ILogger _logger = null;
        public QuoteController(
            IQuoteService quouteService, 
            IStorageService storageService, 
            IQuoteDetailService quoteDetailService)
        {
            _quouteService = quouteService;
            _storageService = storageService;
            _quoteDetailService = quoteDetailService;
            //_logger = logger;
        }
        [HttpGet]
        public Response Get(int quoteNo)
        {
            var quote = new Quote();
            quote.QuoteId = quoteNo;
            quote = _quouteService.GetQuote(quoteNo);
            return new Response
            {
                Result = new { quote, alreadySubmitted = false },
                Status = Status.Success,
                HttpStatusCode = System.Net.HttpStatusCode.OK,
                Message = ""
            };
        }


        [HttpGet]
        [Route("IsAvailable")]
        public Response Get(int quoteId, string region)
        {
            int regionId = CONST_REGION_ID;
            var detail = _quoteDetailService.GetQuoteDetail(quoteId, regionId);
            if (detail != null)
            {
                return new Response
                {
                    Result = new { alreadySubmitted = true },
                    Status = Status.Success,
                    HttpStatusCode = System.Net.HttpStatusCode.OK,
                    Message = "Sorry, a quote has already been submitted for this Quote Number."
                };
            }
            else
            {
                return new Response
                {
                    Result = new { alreadySubmitted = false },
                    Status = Status.Success,
                    HttpStatusCode = System.Net.HttpStatusCode.OK,
                    Message = ""
                };
            }
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
                
                quoteFile.QuoteDetail.MappingSheetPath = result;
                quoteFile.QuoteDetail.CreatedOn = DateTime.Now;
                quoteFile.QuoteDetail.RegionId = CONST_REGION_ID;
                quoteFile.QuoteDetail.VehicleModel = quoteFile.QuoteDetail.Model;
                quoteFile.QuoteDetail.VehicleColor = quoteFile.QuoteDetail.Color;
                quoteFile.QuoteDetail.VehicleRegistration = quoteFile.QuoteDetail.Registration;
                quoteFile.QuoteDetail.VehicleMake = quoteFile.QuoteDetail.Company;

                _quoteDetailService.AddQuoteDetail(quoteFile.QuoteDetail);

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
