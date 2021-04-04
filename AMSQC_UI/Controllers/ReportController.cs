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
            List<Region> regions = _regionService.GetRegions().OrderBy(t => t.Title).ToList();

            regions.Insert(0, new Region() { RegionId = -1, Title = "[All]" });

            List<State> states = _stateService.GetStates();
            states.Insert(0, new State() { StateId = -1, Title = "[All]" });

            var currentUser = _userAdService.GetUserProfile();
            string region = currentUser.Region;

            var regionTemp = _regionService.GetRegion(region);

            var users = _userAdService.GetUsers(regionTemp.RegionId);
            users.Insert(0, new UserInfo() { UserId = -1, FullName = "[All]" });


            return new Response
            {
                Result = new { regions, states, users, alreadySubmitted = false },
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


        [Route("SurveyAnswers")]
        public Response Get(int quoteDetailId, string userGuid)
        {
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





            return new Response
            {

                Result = new { result },
                Status = Status.Success,
                HttpStatusCode = System.Net.HttpStatusCode.OK,
                Message = ""
            };

        }
    }
}
