using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AMSQC.Domain.Models
{
    public class UserSurveyResponse
    {
        public int QuestionId
        {
            get;
            set;
        }
        public string Question
        {
            get;
            set;
        }

        public int ParentQuestionId
        {
            get;
            set;
        }

        public int DisplayOrder
        {
            get; set;
        }

        public bool IsCAR
        {
            get; set;
        }
        public string AnswerId
        {
            get;
            set;
        }
        public string Answer
        {
            get;
            set;
        }
    }

    public class UserSurveyResponseViewModel
    {
        public int UserId { get; set; }

        public int QuoteDetailId { get; set; }

        public string MappingSheet { get; set; }

        public int Category { get; set; }

        public List<UserSurveyResponse> QuestionResponses { get; set; }
    }
}
