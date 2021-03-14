using AMSQC.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AMSQC.Domain.Repository
{
    public interface ISiteRepository
    {
        Task<int> AddSite(Site site);
        List<Site> GetSites();
    }
}
