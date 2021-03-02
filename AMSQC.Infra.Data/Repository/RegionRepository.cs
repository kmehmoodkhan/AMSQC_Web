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
        public BodyShopDbContext _context;

        public RegionRepository(BodyShopDbContext context)
        {
            _context = context;
        }
        public Region GetRegion(string title)
        {
            if (!string.IsNullOrEmpty(title))
            {
                var region = _context.Region.Where(t => t.Title.ToLower() == title.ToLower()).FirstOrDefault();
                return region;
            }
            return null;
        }

        public Region GetRegion(int Id)
        {
            var region = _context.Region.Where(t => t.RegionId == Id).FirstOrDefault();
            return region;
        }

        public List<Region> GetRegions()
        {
            var regions = _context.Region;
            return regions.ToList();
        }
    }
}
