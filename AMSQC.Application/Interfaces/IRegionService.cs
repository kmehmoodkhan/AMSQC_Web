using AMSQC.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AMSQC.Application.Interfaces
{
    public interface IRegionService
    {
        public Region GetRegion(string title);
        public Region GetRegion(int Id);

        public List<Region> GetRegions();
    }
}
