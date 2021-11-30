using AMSQC.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AMSQC.Domain.Repository
{
    public interface ISiteMappingRepoistory
    {
        public SiteMapping GetSiteName(string officeLocation);

        public Task<List<UserInfo>> GetUsers(string region);
    }
}
