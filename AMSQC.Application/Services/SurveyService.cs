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
        public SurveyService(
            ISurveyRepository surveyRepository,
            IUserRepository userRepository,
            IUserADService userService
            )
        {
            _surveyRepository = surveyRepository;
            _userRepository = userRepository;
            _userService = userService;
        }

        public SurveyViewModel GetSurveyDetail(int surveyType,int regionId)
        {
            var surveyViewModel = new SurveyViewModel();
            surveyViewModel.Questions= _surveyRepository.GetSurveyQuestions(surveyType);
            surveyViewModel.ADUsers = _userService.GetUsers(regionId);
            return surveyViewModel;
        }

        public int SaveSurveyReponse(SurveyResponseViewModel surveyResponse)
        {
            var userResponse = surveyResponse.response;
            var userInfo= surveyResponse.response.FirstOrDefault();

            string userGuid = "";
            int userId = 0;

            if (userInfo != null)
            {
                userGuid = userInfo.UserGuid;
                var user= _userRepository.GetUser(userGuid);

                if(user != null)
                {
                    userId = user.UserId;
                }
            }


            IEnumerable<UserQuestionResponse> filteredResponse = null;

            if (!surveyResponse.isSubletShown)
            {
                filteredResponse = userResponse.Where(t => t.IsSubletQuestion == false);
            }

            filteredResponse.ToList().ForEach(f => { f.CreatedOn = DateTime.Now; f.UserId = userId; });
            return _surveyRepository.SaveSurveyReponse(filteredResponse.ToList());
        }

    }
}
