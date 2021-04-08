using AMSQC.Domain.Models;
using AMSQC.Domain.Models.Reports;
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

        public int UpdateQuote(int quoteId, int regionId, int userId,bool isSublet,bool isCAR,int category)
        {
            int result = 0;
            var quoteDetail = _context.QuoteDetail.Where(t => t.QuoteDetailId==quoteId).FirstOrDefault();
            if (quoteDetail != null)
            {
                quoteDetail.IsSubmit = true;
                quoteDetail.IsCar = isCAR;
                quoteDetail.IsSublet = isSublet;
                quoteDetail.SurveyCategory = category;
                _context.QuoteDetail.Update(quoteDetail);
                result = _context.SaveChanges();
            }
            return result;
        }

        public List<AuditSummaryViewModel> GetQuotesList(ReportParameterModel parameterModel)
        {
            var result = (from qd in _context.QuoteDetail    
                          join u in _context.UserInfo on qd.UserId equals u.UserId
                          join s in _context.Site on qd.RegionId equals s.RegionId
                          where qd.IsSubmit==true && qd.QuoteId == (parameterModel.QuoteNo > 0 ? parameterModel.QuoteNo : qd.QuoteId) &&
                          qd.RegionId == (parameterModel.CenterId > 0 ? parameterModel.CenterId : qd.RegionId) &&
                          s.StateId == (parameterModel.RegionId > 0 ? parameterModel.RegionId : s.StateId) &&
                          qd.UserId == (parameterModel.UserId > 0 ? parameterModel.UserId : qd.UserId) &&
                          qd.CreatedOn >= parameterModel.FromDate && qd.CreatedOn <= parameterModel.EndDate &&
                          qd.IsAudit == parameterModel.IsAudit 
                          select new AuditSummaryViewModel
                          {
                              QuoteDetailId = qd.QuoteDetailId,
                              QuoteNo = qd.QuoteId,
                              FullName = u.FullName,
                              DateCompleted = qd.CreatedOn,
                              MappingSheetUrl = qd.MappingSheetPath,
                              CategoryId = qd.SurveyCategory,
                              IsCARAnswered = qd.IsCar,
                              IsSublet = qd.IsSublet
                          });

            return result.ToList();

        }

        public ComplianceSummaryViewModel GetComplianceSummary(ReportParameterModel parameterModel)
        {
            ComplianceSummaryViewModel summary = new ComplianceSummaryViewModel();

            var reportData = (from qd in _context.QuoteDetail
                              join site in _context.Site on qd.RegionId equals site.RegionId
                              join state in _context.States on site.StateId equals state.StateId
                              where
                                 qd.IsSubmit == true &&
                                 qd.IsAudit == false &&
                                 qd.QuoteId == (parameterModel.QuoteNo > 0 ? parameterModel.QuoteNo : qd.QuoteId) &&
                                 qd.RegionId == (parameterModel.CenterId > 0 ? parameterModel.CenterId : qd.RegionId) &&
                                 site.StateId == (parameterModel.RegionId > 0 ? parameterModel.RegionId : site.StateId) &&
                                 qd.UserId == (parameterModel.UserId > 0 ? parameterModel.UserId : qd.UserId) &&
                                 qd.CreatedOn >= parameterModel.FromDate && qd.CreatedOn <= parameterModel.EndDate
                              select new SiteLevelData 
                              {
                                  SiteId = site.RegionId,
                                  SiteName = site.Title,
                                  QuoteDetailId = qd.QuoteDetailId,
                                  State = state.Title,
                                  StateId = state.StateId
                              });

            var result = reportData.ToList();


            if (result != null && result.Count > 0)
            {
                List<RegionData> regionsData = new List<RegionData>();

                var countryLevel = (from r in result
                                    group r by 1 into grp
                                    select new RegionData
                                    {
                                        Title = "Australia",
                                        IsSummary = true,
                                        JobsAudited = grp.Count(),
                                        JobsCompleted = null,
                                        Compliance = 0
                                    }).ToList();

                regionsData.Add(countryLevel.FirstOrDefault());

                var stateLevel = (from r in result
                                  group r by new { r.StateId, r.State } into grp
                                  select new RegionData
                                  {
                                      Title = grp.Key.State,
                                      JobsAudited = grp.Count(),
                                      JobsCompleted = null,
                                      Compliance = 0,
                                      ChildList = null
                                  }).ToList();

                regionsData.AddRange(stateLevel);


                var stateLevelSummary = (from r in result
                                         group r by new { r.StateId, r.State } into grp
                                         select new RegionData
                                         {
                                             Title = grp.Key.State,
                                             ChildList =
                                             (
                                                from r1 in result
                                                where r1.StateId == grp.Key.StateId
                                                group r1 by new { r1.SiteId, r1.SiteName } into grp1
                                                select new RegionData
                                                {
                                                    Title = grp1.Key.SiteName,
                                                    JobsAudited = grp1.Count(),
                                                    Compliance = 0
                                                }
                                             ).ToList()
                                         });

                regionsData.AddRange(stateLevelSummary);

                summary.RegionsData = regionsData;
            }

            return summary;
        }

        public CmComplianceViewModel GetCmComplianceSummary(ReportParameterModel parameterModel)
        {
            var reportData = (from qd in _context.QuoteDetail
                              join site in _context.Site on qd.RegionId equals site.RegionId
                              join state in _context.States on site.StateId equals state.StateId
                              where
                                 qd.IsSubmit == true &&
                                 qd.QuoteId == (parameterModel.QuoteNo > 0 ? parameterModel.QuoteNo : qd.QuoteId) &&
                                 qd.RegionId == (parameterModel.CenterId > 0 ? parameterModel.CenterId : qd.RegionId) &&
                                 site.StateId == (parameterModel.RegionId > 0 ? parameterModel.RegionId : site.StateId) &&
                                 qd.UserId == (parameterModel.UserId > 0 ? parameterModel.UserId : qd.UserId) &&
                                 qd.CreatedOn >= parameterModel.FromDate && qd.CreatedOn <= parameterModel.EndDate
                              select new CmQuoteData
                              {
                                  StateId = state.StateId,
                                  State = state.Title,
                                  SiteId = site.SiteId,
                                  Site = site.Title,
                                  IsAudit = qd.IsAudit,
                                  QuoteId = qd.QuoteId
                              });


            var sitesData = from rd in reportData
                            group rd by new { rd.SiteId, rd.Site, rd.StateId, rd.State } into grpData
                            select new CmComplianceModel
                            {
                                Title = grpData.Key.Site,
                                IsState = false,
                                StateId = grpData.Key.StateId,
                                State = grpData.Key.State,
                                CmAuditCount = grpData.ToList().Where(t => t.IsAudit == true).Count(),
                                SiteAuditCount = grpData.ToList().Where(t => t.IsAudit == false).Count()
                            };


            var reportResult = sitesData.ToList();

            var r1 = from r in reportResult
                     group r by new { r.StateId, r.State } into grpData1
                     select new CmComplianceModel
                     {
                         Title = grpData1.Key.State,
                         IsState = true,
                         StateId = grpData1.Key.StateId,
                         State = grpData1.Key.State,
                         CmAuditCount = grpData1.Sum(t => t.CmAuditCount),
                         SiteAuditCount = grpData1.Sum(t => t.SiteAuditCount)
                     };

            reportResult.AddRange(r1);

            return new CmComplianceViewModel() { ComplianceData = reportResult.OrderByDescending(t=>t.IsState).ToList()};
        }

        public CostOfCarViewModel GetCostOfCARSummary(ReportParameterModel parameterModel)
        {
            var reportData = (from qd in _context.QuoteDetail
                              join site in _context.Site on qd.RegionId equals site.RegionId
                              join state in _context.States on site.StateId equals state.StateId
                              join uqr in _context.UserQuestionResponse on qd.QuoteDetailId equals uqr.QuoteId
                              where
                                 qd.IsSubmit == true &&
                                 qd.IsAudit == false &&
                                  (uqr.QuestionId == 26 || uqr.QuestionId == 27) &&
                                 qd.QuoteId == (parameterModel.QuoteNo > 0 ? parameterModel.QuoteNo : qd.QuoteId) &&
                                 qd.RegionId == (parameterModel.CenterId > 0 ? parameterModel.CenterId : qd.RegionId) &&
                                 site.StateId == (parameterModel.RegionId > 0 ? parameterModel.RegionId : site.StateId) &&
                                 qd.UserId == (parameterModel.UserId > 0 ? parameterModel.UserId : qd.UserId) &&
                                 qd.CreatedOn >= parameterModel.FromDate && qd.CreatedOn <= parameterModel.EndDate
                              select new
                              {
                                  qd.QuoteId,
                                  qd.CreatedOn,
                                  SiteId = site.StateId,
                                  Site = site.Title,
                                  State = state.Title,
                                  StateId = state.StateId,
                                  uqr.Answers,
                                  uqr.QuestionId
                              });

            var resultTempData = reportData.ToList();

            var stateLevelData = (from rd in resultTempData
                                 group rd by new { rd.State, rd.StateId } into grpData
                                 select new StateData
                                 {
                                     StateId = grpData.Key.StateId,
                                     Title = grpData.Key.State,
                                     QuotesList = (
                                            (from rd1 in resultTempData
                                             group rd1 by new { rd1.QuoteId,rd1.CreatedOn, rd1.Site } into grp1
                                             select new StateQuoteDetail
                                             {
                                                 QuoteNo = grp1.Key.QuoteId,
                                                 UserResponsible = resultTempData.Where(t => t.QuoteId == grp1.Key.QuoteId && t.StateId == grpData.Key.StateId && t.QuestionId == 26).FirstOrDefault().Answers,
                                                 CompletionDate = grp1.Key.CreatedOn,
                                                 Cost =Convert.ToDouble(resultTempData.Where(t => t.QuoteId == grp1.Key.QuoteId && t.StateId == grpData.Key.StateId && t.QuestionId == 27 && t.Answers.Length>0).FirstOrDefault()?.Answers),
                                                 Site = grp1.Key.Site
                                             }
                                            ).OrderByDescending(t=>t.CompletionDate).ToList()
                                     )
                                 }).ToList();

            var carCostViewModel = new CostOfCarViewModel();
            carCostViewModel.StatesData = stateLevelData;
            return carCostViewModel;

        }

        public ComplianceSummaryViewModel GetInitialInspectionResults(ReportParameterModel parameterModel)
        {
            ComplianceSummaryViewModel summary = new ComplianceSummaryViewModel();

            var reportData = (from qd in _context.QuoteDetail
                              join site in _context.Site on qd.RegionId equals site.RegionId
                              join state in _context.States on site.StateId equals state.StateId
                              where
                                 qd.IsSubmit == true &&
                                 qd.IsAudit == false &&
                                 qd.QuoteId == (parameterModel.QuoteNo > 0 ? parameterModel.QuoteNo : qd.QuoteId) &&
                                 qd.RegionId == (parameterModel.CenterId > 0 ? parameterModel.CenterId : qd.RegionId) &&
                                 site.StateId == (parameterModel.RegionId > 0 ? parameterModel.RegionId : site.StateId) &&
                                 qd.UserId == (parameterModel.UserId > 0 ? parameterModel.UserId : qd.UserId) &&
                                 qd.CreatedOn >= parameterModel.FromDate && qd.CreatedOn <= parameterModel.EndDate
                              select new
                              {
                                  SiteId = site.RegionId,
                                  SiteName = site.Title,
                                  QuoteDetailId = qd.QuoteDetailId,
                                  State = state.Title,
                                  StateId = state.StateId,
                                  IsCar = qd.IsCar
                              });

            var result = reportData.Distinct().ToList();


            if (result != null && result.Count > 0)
            {
                List<RegionData> regionsData = new List<RegionData>();

                var countryLevel = (from r in result
                                    select new RegionData
                                    {
                                        Title = "Australia",
                                        IsSummary = true,
                                        JobsAudited = (result.Count()),
                                        JobsWithCARs = (result.Where(t=>t.IsCar).Count()),
                                        Compliance = ((result.Where(t => t.IsCar).Count())/ (result.Count()))*100
                                    }).ToList();

                regionsData.Add(countryLevel.FirstOrDefault());

                var stateLevel = (from r in result
                                  group r by new { r.StateId, r.State } into grp
                                  select new RegionData
                                  {
                                      Title = grp.Key.State,
                                      JobsAudited = result.Where(t=>t.StateId == grp.Key.StateId).Count(),
                                      JobsWithCARs = result.Where(t=>t.StateId == grp.Key.StateId && t.IsCar).Count(),
                                      Compliance = ((result.Where(t => t.StateId == grp.Key.StateId && t.IsCar).Count())/(result.Where(t => t.StateId == grp.Key.StateId).Count()))*100,
                                      ChildList = null
                                  }).ToList();

                stateLevel.ForEach(t => { t.Compliance = ((t.JobsAudited / t.JobsWithCARs) * 100);});

                regionsData.AddRange(stateLevel);


                var stateLevelSummary = (from r in result
                                         group r by new { r.StateId, r.State } into grp
                                         select new RegionData
                                         {
                                             Title = grp.Key.State,
                                             ChildList =
                                             (
                                                from r1 in result
                                                where r1.StateId == grp.Key.StateId
                                                group r1 by new { r1.SiteId, r1.SiteName } into grp1
                                                select new RegionData
                                                {
                                                    Title = grp1.Key.SiteName,
                                                    JobsAudited = grp1.Count(),
                                                    JobsWithCARs = (result.Where(t=>t.SiteId==grp1.Key.SiteId && t.IsCar).Count()),
                                                    Compliance = (Convert.ToDouble(result.Where(t => t.SiteId == grp1.Key.SiteId && t.IsCar).Count())/ Convert.ToDouble(grp1.Count())) *100
                                                }
                                             ).ToList()
                                         });

                regionsData.AddRange(stateLevelSummary.ToList());

                summary.RegionsData = regionsData;
            }

            return summary;
        }
    }
}
