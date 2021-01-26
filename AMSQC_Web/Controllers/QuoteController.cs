using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace AMSQC_Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
   // [Authorize]
    public class QuoteController : ControllerBase
    {
        IHostingEnvironment liveEnv = null;
        public QuoteController(IHostingEnvironment env)
        {
            liveEnv = env;
        }
        [HttpGet]
        public Response Get(string quoteNo)
        {
            string path = liveEnv.WebRootPath;
            string path1 = liveEnv.ContentRootPath;

            //var dir = Directory.GetDirectories(path);

            var dir = Directory.GetFiles(path1, "*.*",SearchOption.AllDirectories);

            string files = "";
            foreach(var f in dir)
            {
                files += f + "\n";
            }

            path = files;
            return new Response { Result = new { path, path1, alreadySubmitted = false }, Success = true, StatusCode = System.Net.HttpStatusCode.OK };
            //var quote = new Quote();
            //quote.Company = "Honda";
            //quote.Model = "Civic";
            //quote.Color = "Red";
            //quote.Registration = "ABC 4005";


            //return new Response { Result = new { quote, alreadySubmitted = false }, Success = true, StatusCode = System.Net.HttpStatusCode.OK };
        }

        //[HttpGet]
        //public Response GetPath(string quoteNo)
        //{
        //    string path = liveEnv.WebRootPath;
        //    string path1 = liveEnv.ContentRootPath;
     

        //    return new Response { Result = new { path,path1, alreadySubmitted = false }, Success = true, StatusCode = System.Net.HttpStatusCode.OK };
        //}
    }
}
