using AMSQC.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AMSQC.Application.ViewModels
{
    public class SurveyResponseViewModel
    {
        public List<UserQuestionResponse> response { get; set; }
        public bool isSubletShown { get; set; }
        public bool isDefectFixed { get; set; }
        public int RegionId { get; set; }
        public SurveyType SurveyType { get; set; }
    }
}
