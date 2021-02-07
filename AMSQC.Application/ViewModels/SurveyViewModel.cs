using AMSQC.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AMSQC.Application.ViewModels
{
    public class SurveyViewModel
    {
        public int SurveyType { get; set; }

        public List<Question> Questions { get; set; }

        public List<UserInfo> ADUsers { get; set; }
    }
}
