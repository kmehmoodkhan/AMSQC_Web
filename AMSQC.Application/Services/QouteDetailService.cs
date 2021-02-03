using AMSQC.Application.Interfaces;
using AMSQC.Domain.Models;
using AMSQC.Domain.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AMSQC.Application.Services
{
    public class QouteDetailService : IQouteDetailService
    {
        IQouteDetailRepository _qouteDetailRepository = null;
        public QouteDetailService(IQouteDetailRepository qouteDetailRepository)
        {
            _qouteDetailRepository = qouteDetailRepository;
        }

        public int AddQouteDetail(QouteDetail qouteDetail)
        {
            var result = _qouteDetailRepository.AddQouteDetail(qouteDetail);
            return result;
        }

        public QouteDetail GetQouteDetail(int qouteId, int regionId)
        {
            return _qouteDetailRepository.GetQouteDetail(qouteId, regionId);
        }
    }
}
