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
    [Authorize]
    public class OrganizationController : ControllerBase
    {
        IUserADService _userADService = null;
        public OrganizationController(IUserADService userADService)
        {
            _userADService = userADService;
        }

        [HttpGet]
        public Response Get()
        {
            string token = HttpContext.Request.Headers["Authorization"];

            return new Response
            {
                Result = new { region = "" },
                Status = Status.Success,
                HttpStatusCode = System.Net.HttpStatusCode.OK,
                Message = ""
            };

        }
    }
}
