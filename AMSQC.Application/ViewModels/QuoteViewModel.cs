using AMSQC.Domain.Models;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Text;

namespace AMSQC.Application.ViewModels
{
    public class QuoteViewModel
    {
        public QuoteDetail QuoteDetail { get; set; }
        //public int QuoteId { get; set; }

        public IFormFile MappingSheet
        {
            get;
            set;
        }
    }

    public class SurveySubmissionVM
    {
        public List<UserQuestionResponse> response { get; set; }
        public bool isSubletShown { get; set; }
        public bool isDefectFixed { get; set; }
    }
}
