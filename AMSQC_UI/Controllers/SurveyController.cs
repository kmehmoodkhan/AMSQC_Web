using AMSQC.Application.Interfaces;
using AMSQC.Application.ViewModels;
using AMSQC.Domain.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;

namespace AMSQC_UI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class SurveyController : ControllerBase
    {
        const int CONST_REGION_ID = 2102;
        ISurveyService _surveyService = null;
        public SurveyController(ISurveyService surveyService)
        {
            _surveyService = surveyService;
        }


        [HttpGet]
        public Response Get(int surveyType,string region, ParentType parentType=default)
        {
           
            var survey = _surveyService.GetSurveyDetail(surveyType, CONST_REGION_ID, parentType);

            return new Response
            {
                Result = new { survey },
                Status = Status.Success,
                HttpStatusCode = System.Net.HttpStatusCode.OK,
                Message = ""
            };
        }


        [HttpPost]

        public Response Post(SurveyResponseViewModel vm)
        {
            vm.RegionId = CONST_REGION_ID;

            var answerLength = vm.response.Where(t => t.Answers.Length > 0 && t.Answers.Length > 499);

            if (answerLength == null)
            {
                var result = _surveyService.SaveSurveyReponse(vm);
                return new Response
                {
                    Result = null,
                    Status = Status.Success,
                    HttpStatusCode = System.Net.HttpStatusCode.OK,
                    Message = "The Correct Action Request was submitted successfully."
                };
            }
            else
            {
                return new Response
                {
                    Result = null,
                    Status = Status.Failed,
                    HttpStatusCode = System.Net.HttpStatusCode.OK,
                    Message = "The Quote was NOT submitted successfully. There may be a connectivity issue."
                };
            }
        }
    }
}
