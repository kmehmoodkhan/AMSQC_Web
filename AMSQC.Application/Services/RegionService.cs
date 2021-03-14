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
    public class RegionService : IRegionService
    {
        IRegionRepository _regionRepository = null;
        public RegionService(IRegionRepository regionRepository)
        {
            _regionRepository = regionRepository;
        }
        public Region GetRegion(string title)
        {
            var region= _regionRepository.GetRegion(title);

            if (region == null)
            {
                region = new Region() { RegionId = 82000, Title = "RMA Knoxfield",State="Vic" };
            }
            return region;
        }

        public Region GetRegion(int Id)
        {
            return _regionRepository.GetRegion(Id);
        }

        public List<Region> GetRegions()
        {
            return _regionRepository.GetRegions();
        }
    }
}
