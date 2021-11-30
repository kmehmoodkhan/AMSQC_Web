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
        ISiteMappingRepoistory _siteMappingRepoistory = null;
        IUserService _userDbService = null;
        public SurveyService(
            ISurveyRepository surveyRepository,
            IUserRepository userRepository,
            IUserADService userService,
            IQuoteDetailRepository quoteDetailRepository,
            ISiteMappingRepoistory siteMappingRepoistory,
            IUserService userDbService
            )
        {
            _surveyRepository = surveyRepository;
            _userRepository = userRepository;
            _userService = userService;
            _quoteDetailRepository = quoteDetailRepository;
            _siteMappingRepoistory = siteMappingRepoistory;
            _userDbService = userDbService;
        }

        public async Task<SurveyViewModel> GetSurveyDetail(int surveyType,int regionId,ParentType parentType)
        {
            var surveyViewModel = new SurveyViewModel();
            surveyViewModel.Questions= _surveyRepository.GetSurveyQuestions(surveyType,parentType);
            //surveyViewModel.ADUsers = await _userService.GetUsers(regionId);

            var currentUserProfile = await _userService.GetUserProfile();
            var tempUsers = await _siteMappingRepoistory.GetUsers(currentUserProfile.Region);
            await _userDbService.AddUsers(tempUsers);
            var adUsers = await _userService.GetUsers(regionId);
            surveyViewModel.ADUsers = adUsers;
            return surveyViewModel;
        }

        public int SaveSurveyReponse(SurveyResponseViewModel surveyResponse)
        {
            var userResponse = surveyResponse.response;
            var userInfo= surveyResponse.response.FirstOrDefault();

            bool isSublet = surveyResponse.isSubletShown;
            var cat4Questions = userResponse.Where(t => t.Category == 4 && t.IsSubletQuestion == false).FirstOrDefault();
            bool isCAR = false;
            
            if (cat4Questions != null)
            {
                isCAR = true;
            }
           
            int userId = 0;
            int regionId = 0;

            if (userInfo != null)
            {
                Guid userGuid = userInfo.UserGuid;
                var user= _userRepository.GetUser(userGuid);

                if(user != null)
                {
                    userId = user.UserId;
                    regionId = user.RegionId;
                }
            }


            IEnumerable<UserQuestionResponse> filteredResponse = null;

            int records = 0;

            if (!surveyResponse.isSubletShown)
            {
                filteredResponse = userResponse.Where(t => t.IsSubletQuestion == false);

                if (filteredResponse != null && filteredResponse.Count() > 0)
                {
                    filteredResponse.ToList().ForEach(f => { f.CreatedOn = DateTime.Now; f.UserId = userId; });
                    records = _surveyRepository.SaveSurveyReponse(filteredResponse.ToList());
                }
            }
            else
            {
                userResponse.ToList().ForEach(f => { f.CreatedOn = DateTime.Now; f.UserId = userId; });
                records = _surveyRepository.SaveSurveyReponse(userResponse.ToList());
            }

            int surveyType = (int)surveyResponse.SurveyType;
            _quoteDetailRepository.UpdateQuote(userResponse.FirstOrDefault().QuoteId, regionId, userId,isSublet,isCAR, surveyType);

            return records;
        }

    }
}
