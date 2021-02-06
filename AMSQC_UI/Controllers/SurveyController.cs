using AMSQC.Application.Interfaces;
using AMSQC.Domain.Models;
using Microsoft.AspNetCore.Authorization;
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
    }
}
