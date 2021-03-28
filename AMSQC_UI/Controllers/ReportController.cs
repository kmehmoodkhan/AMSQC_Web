using AMSQC.Application.Interfaces;
using AMSQC.Application.ViewModels;
using AMSQC.Domain.Models;
using AMSQC.Domain.Models.Reports;
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
            List<Region> regions = _regionService.GetRegions().OrderBy(t=>t.Title).ToList();

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
                parameters.IsAudit = false;
                var result = _quoteService.GetAuditSummaryList(parameters);
                return new Response
                {
                    Result = new { result, alreadySubmitted = false },
                    Status = Status.Success,
                    HttpStatusCode = System.Net.HttpStatusCode.OK,
                    Message = ""
                };
            }
            else if (parameters.ReportType == ReportType.CmAudit)
            {
                parameters.IsAudit = true;
                var result = _quoteService.GetAuditSummaryList(parameters);
                return new Response
                {
                    Result = new { result, alreadySubmitted = false },
                    Status = Status.Success,
                    HttpStatusCode = System.Net.HttpStatusCode.OK,
                    Message = ""
                };
            }
            else if (parameters.ReportType == ReportType.CostOfCar)
            {
                var state1 = new StateData();

                var item1 = new StateQuoteDetail()
                {
                    QuoteNo = 1356,
                    AnswerId = 1,
                    CompletionDate = DateTime.Now,
                    Cost = 500,
                    Site = "ABc Center",
                    UserResponsible = "Jaise Rider"
                };

                state1.StateId = 1;
                state1.Title = "Victoria";
                state1.QuotesList = new List<StateQuoteDetail>() { item1 };


                var state2 = new StateData();


                state2.StateId = 1;
                state2.Title = "Queensland";
                state2.QuotesList = new List<StateQuoteDetail>() { item1 };

                List<StateData> result = new List<StateData>() { state1, state2 };


                return new Response
                {
                    Result = new { result, alreadySubmitted = false },
                    Status = Status.Success,
                    HttpStatusCode = System.Net.HttpStatusCode.OK,
                    Message = ""
                };
            }
            else if (parameters.ReportType == ReportType.CmCompliance)
            {
                var reportData = _quoteService.GetCmComplianceSummary(parameters);
                var result = reportData.ComplianceData;

                return new Response
                {
                    Result = new { result, alreadySubmitted = false },
                    Status = Status.Success,
                    HttpStatusCode = System.Net.HttpStatusCode.OK,
                    Message = ""
                };
            }
            else if (parameters.ReportType == ReportType.JobsNotAudited)
            {
                var result = new List<JobsNotAuditedViewModel>();
                result.Add(new JobsNotAuditedViewModel()
                {
                    Color = "Red",
                    CompletionDate = DateTime.Now,
                    Make = "Toyota",
                    Vehicle = "Corolla",
                    QuoteNo = 69699,
                    Registration = "wti 3993"
                });

                return new Response
                {
                    Result = new { result, alreadySubmitted = false },
                    Status = Status.Success,
                    HttpStatusCode = System.Net.HttpStatusCode.OK,
                    Message = ""
                };
            }
            else if ( parameters.ReportType == ReportType.InitialInspectionResults)
            {
                var result = _quoteService.GetComplianceSummary(parameters);

                return new Response
                {
                    Result = new { result, alreadySubmitted = false },
                    Status = Status.Success,
                    HttpStatusCode = System.Net.HttpStatusCode.OK,
                    Message = ""
                };
            }
            else if (parameters.ReportType == ReportType.CsvExport)
            {
                var result = new List<CsvExportViewModel> { new CsvExportViewModel() { QuoteNo = 53804,
                ClaimNo = "CGU202723426" } };

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
