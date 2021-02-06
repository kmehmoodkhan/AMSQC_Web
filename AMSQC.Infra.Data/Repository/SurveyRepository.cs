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

        public List<Question> GetSurveyQuestions(int surveyType)
        {
            byte sType =(byte) surveyType;

            var result = _context.Question
                .Where(q => q.Category == sType)
                .Select(quest => new Question
                {
                    QuestionId = quest.QuestionId,
                    Title = quest.Title,
                    Category= quest.Category,
                    QuestionType = quest.QuestionType,
                    DisplayOrder = quest.DisplayOrder,
                    ParentQuestionId = quest.ParentQuestionId,
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
    }
}
