using AMSQC.Application.Interfaces;
using AMSQC.Application.ViewModels;
using AMSQC.Domain.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;

namespace AMSQC_UI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class SurveyController : ControllerBase
    {
        ISurveyService _surveyService = null;
        public SurveyController(ISurveyService surveyService)
        {
            _surveyService = surveyService;
        }


        [HttpGet]
        public Response Get(int surveyType, int regionId, ParentType parentType = default)
        {
            var survey = _surveyService.GetSurveyDetail(surveyType, regionId, parentType);

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
            var answerLength = vm.response.Where(t => t.Answers.Length > 0 && t.Answers.Length > 499);

            if (answerLength.Count() < 1)
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
