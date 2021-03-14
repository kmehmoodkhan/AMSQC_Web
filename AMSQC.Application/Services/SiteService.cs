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
    public class SiteService : ISiteService
    {
        ISiteRepository _siteRepository = null;
        public SiteService(ISiteRepository siteRepository)
        {
            _siteRepository = siteRepository;
        }
        public Task<int> AddSite(Site site)
        {
            return _siteRepository.AddSite(site);
        }

        public List<Site> GetSites()
        {
            return _siteRepository.GetSites();
        }
    }
}
