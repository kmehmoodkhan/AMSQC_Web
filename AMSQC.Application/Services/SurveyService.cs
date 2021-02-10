using AMSQC.Application.Interfaces;
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
        IUserRepository _userRepository = null;
        IUserADService _userService = null;
        IQuoteDetailRepository _quoteDetailRepository = null;
        public SurveyService(
            ISurveyRepository surveyRepository,
            IUserRepository userRepository,
            IUserADService userService,
            IQuoteDetailRepository quoteDetailRepository
            )
        {
            _surveyRepository = surveyRepository;
            _userRepository = userRepository;
            _userService = userService;
            _quoteDetailRepository = quoteDetailRepository;
        }

        public SurveyViewModel GetSurveyDetail(int surveyType,int regionId,ParentType parentType)
        {
            var surveyViewModel = new SurveyViewModel();
            surveyViewModel.Questions= _surveyRepository.GetSurveyQuestions(surveyType,parentType);
            surveyViewModel.ADUsers = _userService.GetUsers(regionId);
            return surveyViewModel;
        }

        public int SaveSurveyReponse(SurveyResponseViewModel surveyResponse)
        {
            var userResponse = surveyResponse.response;
            var userInfo= surveyResponse.response.FirstOrDefault();

            string userGuid = "";
            int userId = 0;
            int regionId = 0;

            if (userInfo != null)
            {
                userGuid = userInfo.UserGuid;
                var user= _userRepository.GetUser(userGuid);

                if(user != null)
                {
                    userId = user.UserId;
                    regionId = user.RegionId;
                }
            }


            IEnumerable<UserQuestionResponse> filteredResponse = null;

            if (!surveyResponse.isSubletShown)
            {
                filteredResponse = userResponse.Where(t => t.IsSubletQuestion == false);
            }

            filteredResponse.ToList().ForEach(f => { f.CreatedOn = DateTime.Now; f.UserId = userId; });
            var result= _surveyRepository.SaveSurveyReponse(filteredResponse.ToList());

            _quoteDetailRepository.UpdateQuote(userResponse.FirstOrDefault().QuoteId, regionId, userId);

            return result;
        }

    }
}
