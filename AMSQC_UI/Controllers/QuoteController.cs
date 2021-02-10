
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
        IUserService _userService = null;

        public QuoteController(
            IQuoteService quouteService, 
            IStorageService storageService, 
            IQuoteDetailService quoteDetailService,
            IUserService userService)
        {
            _quouteService = quouteService;
            _storageService = storageService;
            _quoteDetailService = quoteDetailService;
            _userService = userService;
        }
        [HttpGet]
        public Response Get(int quoteNo)
        {
            var quote = new Quote();
            quote.QuoteId = quoteNo;
            //quote.Color = "Red";
            //quote.Company = "Honda";
            //quote.InsurerName = "GCO Insurance";
            //quote.Registration = "YX400";

            quote = _quouteService.GetQuote(quoteNo);
            if (quote != null)
            {
                return new Response
                {
                    Result = new { quote, alreadySubmitted = false },
                    Status = Status.Success,
                    HttpStatusCode = System.Net.HttpStatusCode.OK,
                    Message = ""
                };
            }
            else
            {
                return new Response
                {
                    Result = new { quote, alreadySubmitted = false },
                    Status = Status.Failed,
                    HttpStatusCode = System.Net.HttpStatusCode.OK,
                    Message = "Invalid quote, please try another number."
                };
            }
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
                var deletedRecords =_quoteDetailService.DeleteQuote(quoteId, regionId);
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

                var userInfo = _userService.AddUser(new UserInfo()
                {
                    UserGuid = quoteFile.QuoteDetail.UserGuid,
                    UserName = quoteFile.QuoteDetail.UserName,
                    RegionId = CONST_REGION_ID,
                    Region = quoteFile.QuoteDetail.Region,
                    CreatedOn = DateTime.Now
                });

                quoteFile.QuoteDetail.UserId = userInfo.UserId;
                var recordId = _quoteDetailService.AddQuoteDetail(quoteFile.QuoteDetail);

                

                return new Response
                {
                    Status = Status.Success,
                    HttpStatusCode = System.Net.HttpStatusCode.OK,
                    Message = "File uploaded successfully.",
                    Result = new { QuoteId = recordId, FilePath= quoteFile.QuoteDetail.MappingSheetPath } 
                };
            }
            catch (Exception ex)
            {
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
