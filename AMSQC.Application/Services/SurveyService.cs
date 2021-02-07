﻿using AMSQC.Application.Interfaces;
using AMSQC.Application.ViewModels;
using AMSQC.Domain.Models;
using AMSQC.Domain.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AMSQC.Application.Services
{
    public class SurveyService : ISurveyService
    {
        ISurveyRepository _surveyRepository = null;
        public SurveyService(ISurveyRepository surveyRepository)
        {
            _surveyRepository = surveyRepository;
        }

        public SurveyViewModel GetSurveyDetail(int surveyType)
        {
            var surveyViewModel = new SurveyViewModel();
            surveyViewModel.Questions= _surveyRepository.GetSurveyQuestions(surveyType);
            return surveyViewModel;
        }

        public int SaveSurveyReponse(SurveyResponseViewModel surveyResponse)
        {
            var userResponse = surveyResponse.response;

            //remove sublet questions if they were not shown


            userResponse.ForEach(f => f.CreatedOn = DateTime.Now);
            return _surveyRepository.SaveSurveyReponse(userResponse);
        }

    }
}
