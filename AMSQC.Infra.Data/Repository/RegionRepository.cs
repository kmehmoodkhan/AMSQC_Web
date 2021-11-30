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
    public class RegionRepository : IRegionRepository
    {
        public AmsqcDbContext _context;
        IStateRepository _stateRepository = null;

        public RegionRepository(AmsqcDbContext context,IStateRepository stateRepository)
        {
            _context = context;
            _stateRepository = stateRepository;
        }
        public Region GetRegion(string title)
        {
            if (!string.IsNullOrEmpty(title))
            {
                var site = _context.Site.Where(t => t.Title.ToLower() == title.ToLower()).FirstOrDefault();
                if (site != null)
                {
                    var state = _stateRepository.GetStates().Where(t => t.StateId == site.StateId).FirstOrDefault();
                    var region = new Region() { RegionId = site.RegionId, Title = site.Title,State = state.ShortName };
                    return region;
                }
            }
            return null;
        }

        public Region GetRegion(int Id)
        {
            var site = _context.Site.Where(t => t.RegionId == Id).FirstOrDefault();
            if (site != null)
            {
                var region = new Region() { RegionId = site.RegionId, Title = site.Title };
                return region;
            }
            return null;
        }

        public List<Region> GetRegions()
        {
            var regions = _context.Site.Select(t => new Region() { RegionId = t.RegionId, Title = t.Title });
            return regions.ToList();
        }
    }
}
