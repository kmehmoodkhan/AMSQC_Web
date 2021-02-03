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
    public class QouteDetailRepository : IQouteDetailRepository
    {
        public AmsqcDbContext _context;
        public QouteDetailRepository(AmsqcDbContext context)
        {
            _context = context;
        }

        public int AddQouteDetail(QuoteDetail qouteDetail)
        {
            var result = _context.QuoteDetail.Add(qouteDetail);
            return 1;
        }

        public QuoteDetail GetQouteDetail(int qouteId, int regionId)
        {
            var qouteDetail = _context.QuoteDetail.Where(t => t.QouteNo == qouteId && t.RegionId == regionId).FirstOrDefault();
            return qouteDetail;
        }
    }
}
