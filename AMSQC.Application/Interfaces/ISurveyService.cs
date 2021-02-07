using AMSQC.Application.ViewModels;
using AMSQC.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AMSQC.Application.Interfaces
{
    public interface ISurveyService
    {
        SurveyViewModel GetSurveyDetail(int surveyType,int regionId);
        int SaveSurveyReponse(SurveyResponseViewModel surveyResponse);
    }
}
