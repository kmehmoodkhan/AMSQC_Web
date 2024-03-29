﻿using AMSQC.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AMSQC.Domain.Repository
{
    public interface ISurveyRepository
    {
        List<Question> GetSurveyQuestions(int surveyType, ParentType parentType);

        int SaveSurveyReponse(List<UserQuestionResponse> userResponse);
    }
}
