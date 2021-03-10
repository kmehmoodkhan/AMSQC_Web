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
        [HttpGet]
        [Route("Parameters")]
        public Response Get(int quoteNo)
        {
            List<Region> regions = new List<Region>();
            regions.Add(new Region() { RegionId = 0, Title = "All" });
            regions.Add(new Region() { RegionId = 1,Title= "RMA Mornington" });
            regions.Add(new Region() { RegionId = 2, Title = "RMA Knoxfield" });

            List<State> states = new List<State>();
            states.Add(new State() { StateId = 0, Title = "All" });
            states.Add(new State() { StateId = 1, Title = "Victoria" });
            states.Add(new State() { StateId = 2, Title = "New Southwhales" });

            List<UserInfo> users = new List<UserInfo>();
            users.Add(new UserInfo() { UserId = 0, FullName = "All" });
            users.Add(new UserInfo() { UserId = 1, FullName = "Alex Hales" });
            users.Add(new UserInfo() { UserId = 2, FullName = "Tom Benton" });



            return new Response
            {
                Result = new { regions,states,users, alreadySubmitted = false },
                Status = Status.Success,
                HttpStatusCode = System.Net.HttpStatusCode.OK,
                Message = ""
            };

        }

        public Response Post(ReportParameterViewModel parameters)
        {
            AuditSummaryViewModel result = new AuditSummaryViewModel()
            {
                QuoteNo = 1,
                CategoryId = 1,
                AnswersKey = 1,
                DateCompleted = DateTime.Now,
                FullName = "Henry One",
                IsCARAnswered = true,
                IsSublet = false,
                MappingSheetUrl = "xyz"

            };
            return new Response
            {
                Result = new { result, alreadySubmitted = false },
                Status = Status.Success,
                HttpStatusCode = System.Net.HttpStatusCode.OK,
                Message = ""
            };
        }
    }
}
