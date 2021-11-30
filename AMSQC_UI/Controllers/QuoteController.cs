
using AMSQC.Application.Interfaces;
using AMSQC.Application.ViewModels;
using AMSQC.Domain.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Identity.Web.Resource;
using System;
using System.Threading.Tasks;
using System.Linq;

namespace AMSQC_UI.Controllers
{
    [Route("api/[controller]")]
    //[RequiredScope("web-access")]
    [ApiController]
    [Authorize]
    public class QuoteController : ControllerBase
    {
        IQuoteService _quouteService = null;
        IStorageService _storageService = null;
        IQuoteDetailService _quoteDetailService = null;
        IUserService _userService = null;
        IUserADService _userAdService = null;
        IRegionService _regionService = null;
        ISiteService _siteService = null;
        IStateService _stateService = null;

        public QuoteController(
            IQuoteService quouteService, 
            IStorageService storageService, 
            IQuoteDetailService quoteDetailService,
            IUserService userService,
            IUserADService userADService,
            IRegionService regionService,
            ISiteService siteService,
            IStateService stateService)
        {
            _quouteService = quouteService;
            _storageService = storageService;
            _quoteDetailService = quoteDetailService;
            _userService = userService;
            _userAdService = userADService;
            _regionService = regionService;
            _siteService= siteService;
            _stateService = stateService;
        }
        [HttpGet]
        public async Task<Response> Get(int quoteNo)
        {
            var quote = new Quote();
            quote.QuoteId = quoteNo;

            var currentUser = await _userAdService.GetUserProfile();
            string region = currentUser.Region;

            var regionTemp = _regionService.GetRegion(region,true);

            quote = _quouteService.GetQuote(quoteNo, regionTemp.RegionId);
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
                    Message = "Sorry, there was no matching vehicle with this Quote Number."
                };
            }
        }


        [HttpGet]
        [Route("IsAvailable")]
        public async Task<Response> Get(int quoteId, string region)
        {
            UserInfo loggedinUser =await _userAdService.GetUserProfile();
           
            var regionObj = _regionService.GetRegion(loggedinUser.Region);
            var detail = _quoteDetailService.GetQuoteDetail(quoteId, regionObj.RegionId);
            var state = _stateService.GetStates().Where(t => t.ShortName.ToLower() == regionObj.State.ToLower()).FirstOrDefault();


            Site site = new Site()
            {
                RegionId = regionObj.RegionId,
                StateId = state.StateId,
                Title = loggedinUser.Region
            };

           var r=await _siteService.AddSite(site);

            loggedinUser.Region = regionObj.Title;
            loggedinUser.RegionId= regionObj.RegionId;

            if (detail != null)
            {
                return new Response
                {
                    Result = new { alreadySubmitted = true},
                    Status = Status.Success,
                    HttpStatusCode = System.Net.HttpStatusCode.OK,
                    Message = "Sorry, a quote has already been submitted for this Quote Number."
                };
            }
            else
            {
                var deletedRecords =_quoteDetailService.DeleteQuote(quoteId, regionObj.RegionId);
                return new Response
                {
                    Result = new { alreadySubmitted = false, currentUser = loggedinUser },
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
                quoteFile.QuoteDetail.RegionId = quoteFile.QuoteDetail.RegionId;
                quoteFile.QuoteDetail.Region = quoteFile.QuoteDetail.Region;
                quoteFile.QuoteDetail.VehicleModel = quoteFile.QuoteDetail.Model;
                quoteFile.QuoteDetail.VehicleColor = quoteFile.QuoteDetail.Color;
                quoteFile.QuoteDetail.VehicleRegistration = quoteFile.QuoteDetail.Registration;
                quoteFile.QuoteDetail.VehicleMake = quoteFile.QuoteDetail.Company;

                var userInfo = _userService.AddUser(new UserInfo()
                {
                    UserGuid = Guid.Parse(quoteFile.QuoteDetail.UserGuid),
                    UserName = quoteFile.QuoteDetail.UserName,
                    RegionId = quoteFile.QuoteDetail.RegionId,
                    Region = quoteFile.QuoteDetail.Region,
                    FullName = quoteFile.QuoteDetail.FullName,
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

        [Route("AuditQuote")]
        [HttpGet]
        public async Task<Response> AuditQuote(int quoteNo)
        {
            var currentUser = await _userAdService.GetUserProfile();
            string region = currentUser.Region;
            var regionTemp = _regionService.GetRegion(region);
            var quoteDetail = _quoteDetailService.GetAuditQuote(quoteNo, regionTemp.RegionId);
            if (quoteDetail != null)
            {
                return new Response
                {
                    Result = new { quoteDetail, alreadySubmitted = false },
                    Status = Status.Success,
                    HttpStatusCode = System.Net.HttpStatusCode.OK,
                    Message = ""
                };
            }
            else
            {
                return new Response
                {
                    Result = new { quoteDetail, alreadySubmitted = false },
                    Status = Status.Failed,
                    HttpStatusCode = System.Net.HttpStatusCode.OK,
                    Message = "Sorry, there was no matching vehicle with this Quote Number."
                };
            }
        }
    }
}
