using AMSQC.Application.Interfaces;
using AMSQC.Application.ViewModels;
using AMSQC.Domain.Models;
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
    public class ReportController : ControllerBase
    {
        IRegionService _regionService = null;
        IStateService _stateService = null;
        IUserADService _userAdService = null;
        IQuoteDetailService _quoteService = null;
        public ReportController
            (
            IRegionService regionService,
            IStateService stateService,
            IUserADService userAdService,
            IQuoteDetailService quoteService)
        {
            _regionService = regionService;
            _stateService = stateService;
            _userAdService = userAdService;
            _quoteService = quoteService;
        }
        [HttpGet]
        [Route("Parameters")]
        public Response Get(int quoteNo)
        {
            List<Region> regions = _regionService.GetRegions();

            regions.Insert(0, new Region() { RegionId = -1, Title="[All]" });

            List<State> states = _stateService.GetStates();
            states.Insert(0, new State() { StateId = -1, Title = "[All]" });

            var currentUser = _userAdService.GetUserProfile();
            string region = currentUser.Region;

            var regionTemp = _regionService.GetRegion(region);

            var users = _userAdService.GetUsers(regionTemp.RegionId);
            users.Insert(0, new UserInfo() { UserId = -1, FullName = "[All]" });


            return new Response
            {
                Result = new { regions,states,users, alreadySubmitted = false },
                Status = Status.Success,
                HttpStatusCode = System.Net.HttpStatusCode.OK,
                Message = ""
            };

        }

        [HttpPost]
        public Response Post(ReportParameterModel parameters)
        {
            if (parameters.ReportType == ReportType.AuditSummary)
            {
                var result = _quoteService.GetAuditSummaryList(parameters);
                return new Response
                {
                    Result = new { result, alreadySubmitted = false },
                    Status = Status.Success,
                    HttpStatusCode = System.Net.HttpStatusCode.OK,
                    Message = ""
                };
            }
            else
            {
                var result = _quoteService.GetComplianceSummary(parameters);
                return new Response
                {
                    Result = new { result.RegionsData, alreadySubmitted = false },
                    Status = Status.Success,
                    HttpStatusCode = System.Net.HttpStatusCode.OK,
                    Message = ""
                };
            }
        }
    }
}
