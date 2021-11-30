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
        ISiteMappingRepoistory _siteMappingRepository = null;
        ISiteRepository _siteRepository = null;
        IStateRepository _stateRepository = null;
        public RegionService(IRegionRepository regionRepository,ISiteMappingRepoistory siteMappingRepository, ISiteRepository siteRepository,IStateRepository stateRepository)
        {
            _regionRepository = regionRepository;
            _siteMappingRepository = siteMappingRepository;
            _siteRepository = siteRepository;
            _stateRepository = stateRepository;
        }
        public Region GetRegion(string title,bool isExternal=false)
        {
            //if(isExternal)
            //{
            //    var siteMapping = _siteMappingRepository.GetSiteName(title);
            //    var region = !string.IsNullOrEmpty(siteMapping?.SiteName) ? _regionRepository.GetRegion(siteMapping.SiteName) : null;

            //    return region;
            //}
            //else
            {
                var region = _regionRepository.GetRegion(title);
                if (region == null)
                {
                    var siteMapping = _siteMappingRepository.GetSiteName(title);

                    region = !string.IsNullOrEmpty(siteMapping?.SiteName) ? _regionRepository.GetRegion(siteMapping.OfficeLocation) : null;

                    if( siteMapping!=null && region == null)
                    {
                        var state = _stateRepository.GetStates().Where(t => t.ShortName.ToLower().Equals(siteMapping.State.ToLower())).FirstOrDefault();
                        var tempSite = _siteRepository.AddSite(new Site()
                        {
                            RegionId = Convert.ToInt32(siteMapping.SiteId),
                            Title = siteMapping.OfficeLocation,
                            StateId = state.StateId
                        },true);
                    }

                    region = _regionRepository.GetRegion(title);
                }

                if (region == null)
                {
                    region = new Region() { RegionId = 82000, Title = "RMA Knoxfield", State = "Vic" };
                }
                return region;
            }
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
