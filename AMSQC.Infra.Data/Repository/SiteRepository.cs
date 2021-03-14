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
    public class SiteRepository : ISiteRepository
    {

        public AmsqcDbContext _context;

        public SiteRepository(AmsqcDbContext context)
        {
            _context = context;
        }
        public async Task<int> AddSite(Site site)
        {
            int result = 0;
            var tempSite = _context.Site.Where(t => t.Title.ToLower() == site.Title.ToLower()).FirstOrDefault();
            if(tempSite == null)
            {
                _context.Site.Add(site);
                result= await _context.SaveChangesAsync();
            }
            return result;
        }

        public List<Site> GetSites()
        {
            var result = _context.Site.OrderBy(t => t.Title);
            return result.ToList();
        }
    }
}
