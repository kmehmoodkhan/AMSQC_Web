using AMSQC.Application.Interfaces;
using AMSQC.Application.ViewModels;
using AMSQC.Domain.Models;
using AMSQC.Domain.Models.Reports;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MicrosoftGraph = Microsoft.Graph;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Security.Claims;

namespace AMSQC_UI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Policy = AuthorizationPolicies.ReportingRoleRequired)]
    public class ReportController : ControllerBase
    {
        private readonly MicrosoftGraph.GraphServiceClient _graphServiceClient;
        IRegionService _regionService = null;
        IStateService _stateService = null;
        IUserADService _userAdService = null;
        IQuoteDetailService _quoteService = null;
        public ReportController
            (
            IRegionService regionService,
            IStateService stateService,
            IUserADService userAdService,
            IQuoteDetailService quoteService,
            MicrosoftGraph.GraphServiceClient graphServiceClient)
        {
            _regionService = regionService;
            _stateService = stateService;
            _userAdService = userAdService;
            _quoteService = quoteService;
            _graphServiceClient = graphServiceClient;
        }
        [HttpGet]
        [Route("Parameters")]
        
        public async Task<Response> Get(int quoteNo)
        {
            

            List<State> states = _stateService.GetStates();
            states.Insert(0, new State() { StateId = -1, Title = "[All]" });

            var currentUser = await _userAdService.GetUserProfile();
            string region = currentUser.Region;

            var regionTemp = _regionService.GetRegion(region);

            var users =await _userAdService.GetUsers(regionTemp.RegionId);
            users.Insert(0, new UserInfo() { UserId = -1, FullName = "[All]" });
                       

            var currentUserReportAccessLevel = "";
            List<Region> regions = null;

            if (currentUser.ReportAccessLevel.Where(t => t == ReportAccessLevel.Operations).Count() > 0)
            {
                regions = _regionService.GetRegions().OrderBy(t => t.Title).ToList();
                regions.Insert(0, new Region() { RegionId = -1, Title = "[All]" });
            }
             else if ( currentUser.ReportAccessLevel.Where(t=> (t == ReportAccessLevel.CM || t == ReportAccessLevel.CenterManager)).Count() > 0)
            {
                regions = _regionService.GetRegions().OrderBy(t => t.Title).Where(t=>t.Title == currentUser.Region).ToList();
                regions.Insert(0, new Region() { RegionId = -1, Title = "[All]" });
            }
            else if (currentUser.ReportAccessLevel.Where(t => t == ReportAccessLevel.Auditor).Count() > 0)
            {
                regions = _regionService.GetRegions().OrderBy(t => t.Title).Where(t => t.Title == currentUser.Region).ToList();
                regions.Insert(0, new Region() { RegionId = -1, Title = "[All]" });
            }
            else
            {
                regions = _regionService.GetRegions().OrderBy(t => t.Title).ToList();

                regions.Insert(0, new Region() { RegionId = -1, Title = "[All]" });
            }

            return new Response
            {
                Result = new { regions, states, users, alreadySubmitted = false, currentUserReportAccessLevel },
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
                parameters.IsAudit = true;

                var currentUser = _userAdService.GetUserProfile();
                var region = currentUser.Result.Region;

                var regionTemp = _regionService.GetRegion(region);

                parameters.RegionId = regionTemp.RegionId;

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
                var result = _quoteService.GetCostOfCARSummary(parameters);

                return new Response
                {
                    Result = new { result = result.StatesData, alreadySubmitted = false },
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
            else if (parameters.ReportType == ReportType.InitialInspectionResults)
            {
                var result = _quoteService.GetInitialInspectionResults(parameters);

                //var result1 = _quoteService.GetComplianceSummary(parameters);

                return new Response
                {
                    Result = new { result.RegionsData, alreadySubmitted = false },
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

        [HttpGet]
        [Route("SurveyAnswers")]
        public Response Get(int quoteDetailId, string userGuid)
        {
            var result = _quoteService.GetSurveyAnswers(quoteDetailId, userGuid);

            /*
            var result = new UserSurveyResponseViewModel()
            {
                Category = 1,
                MappingSheet = "https://www.google.com",
                QuoteDetailId = 34535,
                UserId = 123,
                QuestionResponses = new List<UserSurveyResponse>()
                {
                    new UserSurveyResponse
                    {
                        Answer = "No",
                        DisplayOrder = 1,
                        Question = "Remove & Replace",
                        IsCAR = false
                    },
                    new UserSurveyResponse
                    {
                        Answer = "No",
                        DisplayOrder = 2,
                        Question = "Paint",
                        IsCAR = false
                    },
                    new UserSurveyResponse
                    {
                        QuestionId = 2,
                        Answer = "ALignment Issues",
                        DisplayOrder = 2,
                        Question = "Remove & Replace defect",
                        IsCAR = true,
                        ParentQuestionId = 1,
                    },
                    new UserSurveyResponse
                    {
                        QuestionId = 3,
                        Answer = "Blemish",
                        DisplayOrder = 1,
                        Question = "Paint defect",
                        IsCAR = true,
                        ParentQuestionId = 1
                    },
                    new UserSurveyResponse
                    {
                        QuestionId = 1,
                        Answer = "No",
                        DisplayOrder = 1,
                        Question = "Remove & Replace defect",
                        IsCAR = true,
                    },
                    new UserSurveyResponse
                    {
                        Answer = "ABC Autobody Services",
                        DisplayOrder = 3,
                        Question = "Who was responsible for the problem?",
                        IsCAR = true
                    },
                    new UserSurveyResponse
                    {
                        Answer = "No",
                        DisplayOrder = 2,
                        Question = "Has the defect been rectified?",
                        IsCAR = true
                    },
                }
            };
            

            */


            return new Response
            {

                Result = result,
                Status = Status.Success,
                HttpStatusCode = System.Net.HttpStatusCode.OK,
                Message = ""
            };

        }


        [HttpPost]
        [Route("AuditQuote")]
        public async Task<Response> Post(int quoteDetailId)
        {
            var currentUser = await _userAdService.GetUserProfile();


            var result = _quoteService.UpdateAuditQuote(quoteDetailId,currentUser.UserGuid.ToString());

            return new Response
            {
                Result = new { result, alreadySubmitted = false },
                Status = Status.Success,
                HttpStatusCode = System.Net.HttpStatusCode.OK,
                Message = "Quote has been audited successfully."
            };
        }

        //public async Task<string> GetRoles()
        //{
        //    var groups = await _graphServiceClient.Me.TransitiveMemberOf
        //        .Request()
        //        .GetAsync();

        //    var groupNames = groups.CurrentPage.Select(t => (t as Microsoft.Graph.Group).DisplayName).ToArray();

        //    var ReportAccessLevel = GetReportAccessLevel(groupNames);

        //    return "";
        //}
    }
}
