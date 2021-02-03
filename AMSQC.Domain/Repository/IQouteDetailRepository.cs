using AMSQC.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AMSQC.Domain.Repository
{
    public interface IQouteDetailRepository
    {
        QouteDetail GetQouteDetail(int qouteId, int regionId);
        int AddQouteDetail(QouteDetail qouteDetail);
    }
}
