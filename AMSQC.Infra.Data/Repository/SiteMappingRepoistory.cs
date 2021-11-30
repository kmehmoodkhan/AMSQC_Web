using AMSQC.Domain.Models;
using AMSQC.Domain.Repository;
using AMSQC.Infra.Data.Context;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;



namespace AMSQC.Infra.Data.Repository
{
    public class SiteMappingRepoistory : ISiteMappingRepoistory
    {
        public SiteMappingDbContext _context;
        AMSQC.Domain.Repository.IRegionRepository _regionRepository;
        public SiteMappingRepoistory(SiteMappingDbContext context, AMSQC.Domain.Repository.IRegionRepository regionRepository)
        {
            _context = context;
            _regionRepository = regionRepository;
        }
        public SiteMapping GetSiteName(string officeLocation)
        {
            var query = _context.SiteMapping.FromSqlRaw("SELECT iBodyShopSiteName,ActiveDirectorySiteName,SiteId,[State] FROM [curated].[dimMasterSite] WHERE ActiveDirectorySiteName = '" + officeLocation + "'").ToList();
            return query.FirstOrDefault();
        }

        public async Task<List<UserInfo>> GetUsers(string region)
        {
            var result = await _context.UserInfo
                .Where(t => t.ActiveDirectorySiteName == region)
                .ToListAsync();

            var regionInfo =  _regionRepository.GetRegion(region);

            var r = result.ToList();
            r.ForEach(t =>
            {
                t.UserGuid = Guid.NewGuid();
                t.FullName = t.FirstName + (!string.IsNullOrEmpty(t.LastName) ? (" " + t.LastName) : "");
                t.Region = region;
                t.RegionId = regionInfo.RegionId; 
            });
            return r;
            
        }
    }
}
