using AMSQC.Application.Interfaces;
using AMSQC.Domain.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace AMSQC_UI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize]
    public class SurveyController : ControllerBase
    {
        ISurveyService _surveyService = null;
        public SurveyController(ISurveyService surveyService)
        {
            _surveyService = surveyService;
        }


        [HttpGet]
        public Response Get(int surveyType)
        {
            var survey = _surveyService.GetSurveyDetail(surveyType);

            return new Response
            {
                Result = new { survey },
                Status = Status.Success,
                HttpStatusCode = System.Net.HttpStatusCode.OK,
                Message = ""
            };
        }


        [HttpPost]

        public Response Post(List<UserQuestionResponse> response,bool isSubletShown,bool isDefectFixed)
        {
            return new Response
            {
                Result = null,
                Status = Status.Success,
                HttpStatusCode = System.Net.HttpStatusCode.OK,
                Message = "Surve response submitted."
            };
        }
    }
}
