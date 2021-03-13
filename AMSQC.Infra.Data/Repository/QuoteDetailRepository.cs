using AMSQC.Domain.Models;
using AMSQC.Domain.Repository;
using AMSQC.Infra.Data.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AMSQC.Infra.Data.Repository
{
    public class QuoteDetailRepository : IQuoteDetailRepository
    {
        public AmsqcDbContext _context;
        public QuoteDetailRepository(AmsqcDbContext context)
        {
            _context = context;
        }

        public int AddQuoteDetail(QuoteDetail quoteDetail)
        {
            _context.QuoteDetail.Add(quoteDetail);
            var result = _context.SaveChanges();
            return quoteDetail.QuoteDetailId;
        }

        public QuoteDetail GetQuoteDetail(int quoteId, int regionId)
        {
            var quoteDetail = _context.QuoteDetail.Where(t => t.QuoteId == quoteId && t.RegionId == regionId && t.IsSubmit==true).FirstOrDefault();
            return quoteDetail;
        }

        public int DeleteQuote(int quoteId, int regionId)
        {
            int rows = 0;
            var quoteDetail = _context.QuoteDetail.Where(t => t.QuoteId == quoteId && t.RegionId == regionId && t.IsSubmit == false);
            if (quoteDetail != null)
            {
                _context.RemoveRange(quoteDetail);
                rows = _context.SaveChanges();
            }
            return rows;
        }

        public int UpdateQuote(int quoteId, int regionId, int userId)
        {
            int result = 0;
            var quoteDetail = _context.QuoteDetail.Where(t => t.QuoteDetailId==quoteId).FirstOrDefault();
            if (quoteDetail != null)
            {
                quoteDetail.IsSubmit = true;
                _context.QuoteDetail.Update(quoteDetail);
                result = _context.SaveChanges();
            }
            return result;
        }

        public List<AuditSummaryViewModel> GetQuotesList(ReportParameterModel parameterModel)
        {
            var result = (from qd in _context.QuoteDetail
                          join uqr in _context.UserQuestionResponse on qd.QuoteDetailId equals uqr.QuoteId
                          join q in _context.Question on uqr.QuestionId equals q.QuestionId
                          where qd.QuoteId == (parameterModel.QuoteNo > 0 ? parameterModel.QuoteNo : qd.QuoteId) &&
                          qd.RegionId == (parameterModel.CenterId > 0 ? parameterModel.CenterId : qd.RegionId) &&
                          qd.UserId == (parameterModel.UserId > 0 ? parameterModel.UserId : qd.UserId) &&
                          qd.CreatedOn >= parameterModel.FromDate && qd.CreatedOn <= parameterModel.EndDate
                          group new {qd,q} by qd.QuoteId into qdg
                          select new AuditSummaryViewModel
                          {
                              QuoteNo = qdg.Key,
                              FullName = qdg.FirstOrDefault().qd.FullName,
                              DateCompleted = qdg.FirstOrDefault().qd.CreatedOn,
                              MappingSheetUrl = qdg.FirstOrDefault().qd.MappingSheetPath,
                              CategoryId = (int)_context.Question.OrderBy(t=>t.Category).FirstOrDefault(t => t.QuestionId == qdg.FirstOrDefault().q.QuestionId && t.Category <4).Category,
                              IsCARAnswered = _context.Question.Any(t => t.QuestionId == qdg.FirstOrDefault().q.QuestionId && t.Category == 4),
                              IsSublet = _context.Question.Any(t => t.QuestionId == qdg.FirstOrDefault().q.QuestionId && t.IsSubletQuestion == true)
                          });

            return result.ToList();

        }

        public ComplianceSummaryViewModel GetComplianceSummary(ReportParameterModel parameterModel)
        {
            ComplianceSummaryViewModel summary = new ComplianceSummaryViewModel();

            List<RegionData> regionsData = new List<RegionData>();

            regionsData.Add(new RegionData()
            {
                Title = "Australia",
                JobsCompleted = 687,
                JobsAudited = 7295,
                Compliance = 1062,
                IsSummary = true
            });

            regionsData.Add(new RegionData()
            {
                Title = "Queensland",
                JobsCompleted = 423,
                JobsAudited = 5098,
                Compliance = 1205
            });
            regionsData.Add(new RegionData()
            {
                Title = "Victoria",
                JobsCompleted = 260,
                JobsAudited = 3955,
                Compliance = 100
            });

            var r1 = new RegionData()
            {
                Title = "Autoco Hume",
                JobsAudited = 0,
                Compliance = 0
            };

            var r2 = new RegionData()
            {
                Title = "Gemini Kingston",
                JobsCompleted = 6,
                JobsAudited = 5,
                Compliance = 10
            };

            var list = new List<RegionData>();
            list.Add(r1);
            list.Add(r2);

            regionsData.Add(new RegionData()
            {
                Title = "Australian Capital Terrotiry",
                ChildList = list
            });


            regionsData.Add(new RegionData()
            {
                Title = "New Southwales",
                ChildList = list
            });

            summary.RegionsData = regionsData;
            return summary;
        }
    }
}
