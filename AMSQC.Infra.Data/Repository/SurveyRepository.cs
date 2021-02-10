using AMSQC.Domain.Models;
using AMSQC.Domain.Repository;
using AMSQC.Infra.Data.Context;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AMSQC.Infra.Data.Repository
{
    public class SurveyRepository : ISurveyRepository
    {
        public AmsqcDbContext _context;

        public SurveyRepository(AmsqcDbContext context)
        {
            _context = context;
        }

        public List<Question> GetSurveyQuestions(int surveyType,ParentType parentType)
        {
            byte sType =(byte) surveyType;

            string allowedTypeFilter = "";

            if( parentType == ParentType.SurveyType1)
            {
                allowedTypeFilter = "1";
            }
            else if (parentType == ParentType.SurveyType2)
            {
                allowedTypeFilter = "2";
            }
            else if (parentType == ParentType.SurveyType3)
            {
                allowedTypeFilter = "3";
            }
           

            var result = _context.Question
                .Where(q => q.Category == sType && q.AllowedSurveyTypes.Contains(allowedTypeFilter))
                .Select(quest => new Question
                {
                    QuestionId = quest.QuestionId,
                    Title = quest.Title,
                    Category= quest.Category,
                    QuestionType = quest.QuestionType,
                    DisplayOrder = quest.DisplayOrder,
                    ParentQuestionId = quest.ParentQuestionId,
                    IsSubletQuestion = quest.IsSubletQuestion,
                    IsAdUsers = quest.IsAdUsers,
                    QuestionOptions = _context.QuestionOption
                    .Where(t=>t.QuestionId == quest.QuestionId)
                    .Select(qo => new QuestionOption
                    {
                        Title = qo.Title,
                        QuestionId = qo.QuestionId,
                        DisplayOrder = qo.DisplayOrder,
                        QuestionOptionId = qo.QuestionOptionId
                    })
                   .ToList(),
                });

            return result.ToList();
        }

        public int SaveSurveyReponse(List<UserQuestionResponse> userResponse)
        {
            _context.UserQuestionResponse.AddRange(userResponse);
            var result = _context.SaveChanges();
            return result;
        }
    }
}
